import React from 'react';
import { Icon, List, Segment, Header } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';

const CommunityList = ({
  header, communities, showDeleteIcon, onDeleteClick,
}) => (
  <React.Fragment>
    <Header as="h3" attached="top" block>
      <Icon name="users" />
      {header}
    </Header>
    <Segment attached>
      <List verticalAlign="middle" selection animated>
        {communities && communities.length
          ? communities.map(c => (
            <List.Item key={c.id}>
              {showDeleteIcon && (
              <List.Content floated="right" onClick={() => onDeleteClick(c.id)}>
                <Icon name="x" />
              </List.Content>
                )}
              <List.Content as={Link} to={`/community/${c.id}`}>
                <List.Header>{c.name}</List.Header>
              </List.Content>
            </List.Item>
            ))
          : 'No communities yet :('}
      </List>
    </Segment>
  </React.Fragment>
);

export default CommunityList;
