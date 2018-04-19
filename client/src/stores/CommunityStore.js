import { observable, action, runInAction, computed } from 'mobx';

import RequestLayer from '../middlewares/requestLayer';
import TransportLayer from '../middlewares/transportLayer';
import userStore from './userStore';
import uiStore from './uiStore';

class CommunityStore {
  @observable communities = [];
  @observable communityId;
  @observable isLoading = false;
  @observable name = '';
  @observable errors = undefined;

  constructor() {
    this.requestLayer = new RequestLayer();
    this.transportLayer = new TransportLayer();
  }

  @action
  setName(name) {
    this.name = name;
  }

  @action
  clearErrors() {
    this.errors = undefined;
  }

  /**
   * Get all communities created by the current logged in user
   */
  @computed
  get myCommunities() {
    if (!userStore.user || !userStore.user.id) return [];
    return this.communities.filter(c => c.creatorId === userStore.user.id);
  }

  @action
  async fetchAllCommunities() {
    try {
      this.isLoading = true;
      const communities = await this.requestLayer.fetchAllCommunities();
      runInAction(() => {
        this.communities = communities;
      });
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }

  @action
  async createCommunity() {
    this.isLoading = true;
    try {
      const communityId = await this.transportLayer.createCommunity(this.name);
      runInAction(() => {
        this.communityId = communityId;
        uiStore.addAlertMessage('Successfully created community!', 'Hot Dog!', 'success');
      });
    } catch (err) {
      this.errors = err.response.data;
    }
    this.isLoading = false;
  }

  @action
  async deleteCommunity(id) {
    const commIdx = this.communities.findIndex(c => c.id === id);
    if (commIdx !== -1) {
      this.communities.splice(commIdx, 1);
      try {
        await this.transportLayer.deleteCommunity(id);
      } catch (err) {
        console.log(err);
        this.errors = err.response.data;
      }
    }
  }
}

export default new CommunityStore();
