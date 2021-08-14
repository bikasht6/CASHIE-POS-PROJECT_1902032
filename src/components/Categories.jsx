import React, { useEffect, useState } from "react";
import axios from 'axios';
import queryString from "query-string";
import { InputAdornment, Grid, Button, InputLabel, FormControl, Select, OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from "@material-ui/icons/Search";
import {Link} from 'react-router-dom';


const useStyles = makeStyles({
	category:{
		padding:'20px 20px',
		backgroundColor:'#fff',
		marginBottom:'20px',
		borderRadius:'10px',
		display:'flex',
		justifyContent:'space-between'
	},
	container:{
		padding:'0 20px'
	},
	heading:{
		display:'flex',
		justifyContent:'space-between',
		marginBottom:'30px'
	},
	filters:{
		marginBottom:'20px'
	}
});


function Categories(props) {
	const classes = useStyles();
	const [categories, setCategories] = useState([])
	const [query, setQuery] = useState({
		page: 0,
		limit:20,
		sort:"Newest"
	});
	const handleQueryChange = (e) => {
		setQuery({ ...query, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		axios(`${process.env.REACT_APP_BACKEND_API}category?${queryString.stringify(query)}`)
		.then((result)=>{
			setCategories(result.data.data.categories)
		})
	}, [query])
	return (
		<Grid className = {classes.container} container xs ={12}>
			<Grid className = {classes.heading} item container xs = {12} >
				<h2>Category Lists</h2>
				<Link to = {`${props.match.path}/new`}>
				<Button variant="contained" color="secondary">
					+ New Data
				</Button>
				</Link>
			</Grid>
			<Grid className = {classes.filters} container justifyContent="flex-end">
					<form onChange={handleQueryChange}>
						<FormControl variant="outlined">
							<OutlinedInput
								id="outlined-adornment-password"
								name="keyword"
								placeholder="Search products..."
								endAdornment={
									<InputAdornment position="end">
										<SearchIcon />
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel htmlFor="outlined-age-native-simple">
								Sort By
							</InputLabel>
							<Select
								native
								value=""
								inputProps={{
									name: "sort",
									id: "outlined-age-native-simple",
								}}>
								<option aria-label="None" value="" />
								<option value="Newest">Newest</option>
								<option value="Oldest">Oldest</option>
								<option value="Name">Name</option>
							</Select>
						</FormControl>
					</form>
				</Grid>
			{categories.map(category=>(
				<Grid className = {classes.category}  xs = {12} item>
					{category.name}
					<MoreVertIcon/>
				</Grid>
			))}
		</Grid>
	);
}

export default Categories;
