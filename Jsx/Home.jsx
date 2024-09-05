import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <header>
        <h1>Reviews Site</h1>
      </header>
      <main>
        <section>
          <h2>Read Reviews</h2>
          <p>Here you can read through reviews on various items.</p>
          <Link to='/reviews'>View All Reviews</Link>
        </section>
        <section>
          <h2>Search for Items</h2>
          <p>
            Search for and find specific items and check out their ratings and
            reviews.
          </p>
          <input type='text' placeholder='Search...' />
          <button>Search</button>
        </section>
        <section>
          <h2>Sign Up / Log In</h2>
          <p>Create an account or log in to write reviews!</p>
          <Link to='/signup'>Sign Up</Link> | <Link to='/login'>Log In</Link>
        </section>
      </main>
      <footer>
        <p>Thank You for Visiting</p>
      </footer>
    </div>
  );
};

export default Home;
