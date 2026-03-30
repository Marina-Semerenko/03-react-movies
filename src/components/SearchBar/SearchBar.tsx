import { useState } from "react";
import styles from './SearchBar.module.css'
import toast from "react-hot-toast";

export default function SearchBar ({ onSubmit }) {
  const [movies, setMovies] = useState([]);

  async function handleSearch(formData) {
    const query = formData.get("query").trim();
 
    if (!query) {
      toast.error('Please enter your search query');
      return;
    }

    try {
      const data = await onSubmit(query);
      if (data.length === 0) {
        toast('No movies found  for your request.')
      }
      setMovies(data);
    } catch (error) {
      toast.error('Error')
    }
  }

  return (
<header className={styles.header}>
  <div className={styles.container}>
    <a
      className={styles.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header>
  )
}





