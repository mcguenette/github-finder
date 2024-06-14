import React from 'react';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../style/img/github-mark-white.png';
import { motion } from 'framer-motion';

function Search() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        const username = data.Search;
        if (username) {
            navigate(`/user/${username}`);
        }
    };

    return (
        <motion.section
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div>
                <figure>
                    <img src={logo} alt='logo' className='main-logo' />
                </figure>
                <h1>Welcome to Github Finder</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='search-input'>
                        <input
                            type='text'
                            placeholder='Enter a github username'
                            {...register('Search', { required: true, maxLength: 80 })}
                        />
                        {errors.Search && <p>Please enter a valid username</p>}
                    </div>
                    <div>
                        <Button
                            type='submit'
                            children='Search user'
                            className='primary'
                        />
                    </div>
                </form>

            </div>
        </motion.section>
    );
}

export default Search;