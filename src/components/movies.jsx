import React, { Component } from 'react'
import { getMovies } from "../services/fakeMovieService";
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Like from './common/like';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
     } 

        handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
        }

        handleLiked = movie => {
            const movies = [...this.state.movies];
            const index = movies.indexOf(movie);
            movies[index] = {...movies[index]};
            movies[index].liked = !movies[index].liked;
            this.setState({ movies });
        }

        handlePageChange = page =>{
            this.setState({ currentPage: page });
        }

    render() { 
        const { length: movieCount } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;

        if (this.state.movies.length === 0) {
            return <p>There are no movies in the database</p>
        }

        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <React.Fragment>
                <p>Showing {movieCount} movies from the database.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th>Liked</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => 
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like liked={movie.liked} onClick={() => this.handleLiked(movie)} /></td>
                            <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Remove</button></td>
                        </tr>)}
                    </tbody>
                </table>
                <Pagination 
                    itemsCount={movieCount} 
                    pageSize={pageSize} 
                    onPageChange={this.handlePageChange} 
                    currentPage={currentPage} 
                />
            </React.Fragment>
        );
    }
}
 
export default Movies;