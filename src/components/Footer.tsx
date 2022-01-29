import React, { useEffect, useState } from 'react';

interface Contributor {
  avatar_url: string;
  contributions: number;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: string;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

interface State {
  contributors: [Contributor] | Contributor[] | [];
  showList: boolean;
}

const Footer = () => {
  const [contributors, setContributors] = useState<State['contributors']>([]);
  const [showList, setShowList] = useState<State['showList']>(false);

  useEffect(() => {
    const contributorsList = async () => {
      if (contributors.length !== 0) {
        setContributors([]);
        return;
      }
      const res = await fetch(
        'https://api.github.com/repos/Goggwell/typetest/contributors'
      );
      const data: [Contributor] = await res.json();
      const filtered = data.filter((contributor) => contributor.login);
      setContributors(filtered);
      console.log(filtered);
    };
    contributorsList();
  }, []);

  return (
    <div className='bottom-area'>
      <span className='hint'>
        <kbd>Tab</kbd> to restart test
      </span>
      <footer>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/Goggwell/typetest'
        >
          <span>&lt;/&gt;</span> github
        </a>
        <span>
          created by{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/Goggwell'
          >
            @Goggwell
          </a>
        </span>
        {showList ? (
          <div className='contributor-list' onBlur={console.log}>
            <h2>contributors</h2>
            {contributors.map((contributor) => (
              <a
                className='contributor'
                href={contributor.html_url}
                target='_blank'
                rel='noreferrer'
                key={contributor.node_id}
              >
                <img
                  height={50}
                  width={50}
                  src={contributor.avatar_url}
                  alt={`${contributor.login}'s avatar`}
                />
                <div className='contributor-details'>
                  <div>@{contributor.login}</div>
                  <div>{contributor.contributions} commits</div>
                </div>
              </a>
            ))}
          </div>
        ) : null}
        <button onClick={(e) => setShowList(!showList)}>
          {showList ? 'x close' : '{} contributors'}
        </button>
      </footer>
    </div>
  );
};

export default Footer;
