import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

function MasterDetail({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (payload) => {
    setSelectedItem(payload);
  };

  const renderItems = () =>
    React.Children.map(children, (child) => {
      if (child.type === MasterDetail.Item) {
        return React.cloneElement(child, {
          onClick: handleItemClick,
          isSelected: selectedItem === child.props.payload,
        });
      }
      return null;
    });

  const renderDetail = () =>
    React.Children.map(children, (child) => {
      if (child.type === MasterDetail.Detail && selectedItem) {
        return child.props.children(selectedItem);
      }
      return null;
    });

  return (
    <div className="master-detail">
      <div className="master-detail__items">{renderItems()}</div>
      <div className="master-detail__detail">{renderDetail()}</div>
    </div>
  );
}

MasterDetail.Item = function MasterDetailItem({ children, payload, onClick, isSelected }) {
  const handleClick = () => {
    onClick(payload);
  };

  return (
    <div
      className={`master-detail__item${isSelected ? ' master-detail__item--selected' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

MasterDetail.Detail = function MasterDetailDetail({ children }) {
  return <div className="master-detail__detail-content">{children}</div>;
};

const REPO_LIST_QUERY = gql`
  query {
    user(login: "pinojs") {
      repositories(first: 50, isFork: false, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          description
        }
      }
    }
  }
`;

function RepoList() {
  const { loading, error, data } = useQuery(REPO_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <MasterDetail>
      {data.user.repositories.nodes.map((repo) => (
        <MasterDetail.Item key={repo.name} payload={repo}>
          {repo.name}
        </MasterDetail.Item>
      ))}
      <MasterDetail.Detail>
        {(payload) => (
          <div>
            <h2>{payload.name}</h2>
            <p>{payload.description}</p>
          </div>
        )}
      </MasterDetail.Detail>
    </MasterDetail>
  );
}

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

function App() {
  return (
    <div>
      <h2>My GitHub Repositories</h2>
      <RepoList />
    </div>
  );
}

