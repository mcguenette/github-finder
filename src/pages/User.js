import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { motion } from 'framer-motion';

function User() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
        const URL = 'https://api.github.com';
        const options = {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        };
        console.log('Token:', process.env.REACT_APP_GITHUB_TOKEN);

        const fetchUser = async () => {
            try {
                const userResponse = await axios.get(`${URL}/users/${username}`, options);
                setUserData(userResponse.data);

                const reposResponse = await axios.get(`${URL}/users/${username}/repos?sort=created&per_page=5`, options);
                setRepos(reposResponse.data);
            } catch (err) {
                console.error('Error: Not able to get GitHub user info', err);
            }
        };

        fetchUser();
    }, [username]);

    return (
        <motion.section
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            {userData && (
                <>
                    <figure>
                        <img src={userData.avatar_url} alt={`${userData.login}'s profile`} />
                    </figure>
                    <h2>{userData.login}</h2>
                    <div className='user-info'>
                        <div>
                            <span>{userData.public_repos}</span>
                            <p> Repositories</p>
                        </div>
                        <div>
                            <span>{userData.followers}</span>
                            <p>Followers</p>
                        </div>
                        <div>
                            <span>{userData.following}</span>
                            <p>Following</p>
                        </div>
                    </div>
                    <div className='github-button'>
                        <Button
                            onClick={() => window.open(userData.html_url, '_blank')}
                            className='primary'
                            children='Go to GitHub'
                        />
                        <Link to='/' className='secondary' >Back to search</Link>
                    </div>
                    <div className='user-repos'>
                        <h3>Recent Repositories</h3>
                        <ul>
                            {repos.map(repo => (
                                <div className='repo-card' key={repo.id}>
                                    <li>
                                        <span>
                                            <a href={repo.html_url}
                                                target='_blank'
                                                rel='noopener noreferrer'>
                                                {repo.name}
                                            </a>
                                            <p className='repo-date'>Updated on {new Date(repo.created_at).toLocaleDateString()}</p>
                                        </span>
                                        <p>{repo.description}</p>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </motion.section>
    );
}

export default User;
