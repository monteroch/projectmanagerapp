import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import FilterListIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
	service: {
		fontWeight: 300,
	},
	users: {
		marginRight: 0,
	},
	button: {
		color: "#fff",
		backgroundColor: theme.palette.common.orange,
		borderRadius: 50,
		textTransform: "none",
		"&.hover": {
			backgroundColor: theme.palette.secondary.light
		}
	}
}));

function createData(
	name,
	date,
	service,
	features,
	complexity,
	platforms,
	users,
	total, 
	search
) {
	return {
		name,
		date,
		service,
		features,
		complexity,
		platforms,
		users,
		total,
		search
	};
}

export default function ProjectManager() {
	const classes = useStyles();
	const theme = useTheme();
	const [rows, setRows] = useState([
		createData(
			"Christian Montero",
			"11/2/19",
			"Website",
			"E-commerce",
			"N/A",
			"N/A",
			"N/A",
			"$1500",
			true
		),
		createData(
			"Bill Gates",
			"10/17/19",
			"Custom Software",
			"GPS, Push Notifications, Users/Authentications, File Transfer",
			"Medium",
			"Web Application",
			"0-10",
			"$1600",
			true
		),
		createData(
			"Steve Jobs",
			"11/19/19",
			"Custom Software",
			"Photo/Video Transfer",
			"Low",
			"Web Application",
			"10-100",
			"$1250",
			true
		),
	]);

	const platformOption = ["Web", "iOS", "Android"];
	var featureOption = ["Photo/Video", "GPS", "FileTransfer", "Users/Authentication", "Biometrics", "Push Notifications"];
	var websiteOptions = ["Basic", "Interactive", "E-Commerce"];

	const [websiteChecked, setWebsiteChecked] = useState(false);
	const [iOSChecked, setIOSChecked] = useState(false);
	const [androidChecked, setAndroidChecked] = useState(false);
	const [softwareChecked, setSoftwareChecked] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [name, setName] = useState("");
	const [date, setDate] = useState(new Date());
	const [total, setTotal] = useState("");
	const [service, setService] = useState("");
	const [complexity, setComplexity] = useState("");
	const [users, setUsers] = useState("");
	const [platforms, setPlatforms] = useState([]);
	const [features, setFeatures] = useState([]);
	const [search, setSearch] = useState("");


	const addProject = () => {
		setRows([...rows, createData(
			name, 
			format(date, "MM/dd/yy"), 
			service, 
			features.join(", "), 
			service === "Website" ? "N/A" : complexity, 
			service === "Website" ? "N/A" : platforms.join(", "), 
			service === "Website" ? "N/A" : users, 
			`$${total}`,
			true)]
		);
		setDialogOpen(false);
		setName("");
		setDate(new Date());
		setTotal("");
		setService("");
		setComplexity("");
		setUsers("");
		setPlatforms([]);
		setFeatures([]);
	}

	const handleSearch = event => {
		setSearch(event.target.value);
		const rowData = rows.map(row => Object.values(row).filter(option => option !== true && option !== false));

		const matches = rowData.map(row => row.map(option => option.toLowerCase().includes(event.target.value.toLowerCase())));
		
		const newRows = [...rows];
		matches.map((row, index) => row.includes(true) ? newRows[index].search = true : newRows[index].search = false);

		setRows(newRows);
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container direction="column">
				<Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
					<Typography variant="h1">Projects</Typography>
				</Grid>

				{/* Textfield section */}
				<Grid item>
					<TextField
						placeholder="Search project details or create a new entry"
						onChange={handleSearch}
						value={search}
						style={{ width: "35em", marginLeft: "5em" }}
						InputProps={{
							endAdornment: (
								<InputAdornment
									position="end"
									style={{ cursor: "pointer" }}
									onClick={() => setDialogOpen(true)}
								>
									<AddIcon color="primary" style={{ fontSize: 30 }} />
								</InputAdornment>
							),
						}}
					/>
				</Grid>

				{/* Switches */}
				<Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
					<FormGroup row>
						<FormControlLabel
							style={{ marginRight: "5em" }}
							control={
								<Switch
									checked={websiteChecked}
									color="primary"
									onChange={() => setWebsiteChecked(!websiteChecked)}
								/>
							}
							label="Websites"
							labelPlacement="start"
						/>

						<FormControlLabel
							style={{ marginRight: "5em" }}
							control={
								<Switch
									checked={iOSChecked}
									color="primary"
									onChange={() => setIOSChecked(!iOSChecked)}
								/>
							}
							label="iOS"
							labelPlacement="start"
						/>

						<FormControlLabel
							style={{ marginRight: "5em" }}
							control={
								<Switch
									checked={androidChecked}
									color="primary"
									onChange={() => setAndroidChecked(!androidChecked)}
								/>
							}
							label="Android"
							labelPlacement="start"
						/>

						<FormControlLabel
							style={{ marginRight: "5em" }}
							control={
								<Switch
									checked={softwareChecked}
									color="primary"
									onChange={() => setSoftwareChecked(!softwareChecked)}
								/>
							}
							label="Software"
							labelPlacement="start"
						/>
					</FormGroup>
				</Grid>

				{/* Table */}
				<Grid item container justify="flex-end" style={{ marginTop: "5em" }}>
					<Grid item style={{ marginRight: 75 }}>
						<FilterListIcon color="secondary" style={{ fontSize: 50 }} />
					</Grid>
				</Grid>
				<Grid item style={{ marginBottom: "15em" }}>
					<TableContainer component={Paper} elevation={0}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="center">Name</TableCell>
									<TableCell align="center">Date</TableCell>
									<TableCell align="center">Service</TableCell>
									<TableCell align="center">Features</TableCell>
									<TableCell align="center">Complexity</TableCell>
									<TableCell align="center">Platforms</TableCell>
									<TableCell align="center">Users</TableCell>
									<TableCell align="center">Total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.filter(row => row.search).map((row, index) => (
									<TableRow key={index}>
										<TableCell align="center">{row.name}</TableCell>
										<TableCell align="center">{row.date}</TableCell>
										<TableCell align="center">{row.service}</TableCell>
										<TableCell align="center" style={{ maxWidth: "5em" }}>
											{row.features}
										</TableCell>
										<TableCell align="center">{row.complexity}</TableCell>
										<TableCell align="center">{row.platforms}</TableCell>
										<TableCell align="center">{row.users}</TableCell>
										<TableCell align="center">{row.total}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>

				{/* Table */}
				<Dialog
					fullWidth
					maxWidth="md"
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
				>
					<Grid container justify="center">
						<Grid item>
							<Typography variant="h1" gutterBottom>
								Add new Project
							</Typography>
						</Grid>
					</Grid>
					<DialogContent>
						<Grid container justify="space-between">
							<Grid item>
								<Grid item container direction="column" sm>
									<Grid item>
										<TextField
											label="name"
											fullWidth
											id="name"
											value={name}
											onChange={(event) => setName(event.target.value)}
										/>
									</Grid>
									<Grid
										item
										container
										direction="column"
										style={{ marginTop: "5em" }}
									>
										<Grid item>
											<Typography variant="h4">Service</Typography>
										</Grid>
										<Grid item>
											<RadioGroup
												aria-label="Service"
												name="Service"
												value={service}
												onChange={(event) => {setService(event.target.value); setFeatures([])}}
											>
												<FormControlLabel
													classes={{ label: classes.service }}
													label="Website"
													value="Website"
													control={<Radio />}
												/>
												<FormControlLabel
													classes={{ label: classes.service }}
													label="Mobile App"
													value="Mobile App"
													control={<Radio />}
												/>
												<FormControlLabel
													classes={{ label: classes.service }}
													label="Custom Software"
													value="Custom Software"
													control={<Radio />}
												/>
											</RadioGroup>
										</Grid>
										<Grid item style={{ marginTop: "5em" }}>
											<Select
												labelId="platforms"
												id="platforms"
												style={{width: "10em"}}
												multiple
												displayEmpty
												renderValue={
													platforms.length > 0 ? (undefined) : () => "Platforms"
												}
												value={platforms}
												onChange={(event) => setPlatforms(event.target.value)}
											>
												{platformOption.map((option) => (
													<MenuItem key={option} value={option}>
														{option}
													</MenuItem>
												))}
											</Select>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Grid item>
								<Grid
									style={{ marginTop: 16 }}
									item
									container
									direction="column"
									sm
									alignItems="center"
								>
									<Grid item>
										<KeyboardDatePicker
											format="MM/dd/yyyy"
											value={date}
											onChange={(newDate) => setDate(newDate)}
										/>
									</Grid>
									<Grid item>
										<Grid
											item
											container
											direction="column"
											style={{ marginTop: "5em" }}
										>
											<Grid item>
												<Typography variant="h4">Complexity</Typography>
											</Grid>
											<Grid item>
												<RadioGroup
													aria-label="Complexity"
													name="Complexity"
													value={complexity}
													onChange={(event) =>
														setComplexity(event.target.value)
													}
												>
													<FormControlLabel
														disabled={service === "Website"}
														classes={{ label: classes.service }}
														label="Low"
														value="Low"
														control={<Radio />}
													/>
													<FormControlLabel
														disabled={service === "Website"}
														classes={{ label: classes.service }}
														label="Medium"
														value="Medium"
														control={<Radio />}
													/>
													<FormControlLabel
														disabled={service === "Website"}
														classes={{ label: classes.service }}
														label="High"
														value="High"
														control={<Radio />}
													/>
												</RadioGroup>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Grid item>
								<Grid
									item
									container
									direction="column"
									sm
									alignItems="flex-end"
								>
									<Grid item>
										<TextField
											value={total}
											id="total"
											label="Total"
											onChange={(event) => setTotal(event.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">$</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item style={{alignItems: "flex-end"}}>
										<Grid
											item
											container
											direction="column"
											style={{ marginTop: "5em" }}
										>
											<Grid item>
												<Typography variant="h4">Users</Typography>
											</Grid>
											<Grid item>
												<RadioGroup
													aria-label="Users"
													name="Users"
													value={users}
													onChange={(event) => setUsers(event.target.value)}
												>
													<FormControlLabel
														disabled={service === "Website"}
														classes={{
															label: classes.service,
															root: classes.users,
														}}
														label="0-10"
														value="0-10"
														control={<Radio />}
													/>
													<FormControlLabel
														disabled={service === "Website"}
														classes={{
															label: classes.service,
															root: classes.users,
														}}
														label="10 - 100"
														value="10 - 100"
														control={<Radio />}
													/>
													<FormControlLabel
														disabled={service === "Website"}
														classes={{
															label: classes.service,
															root: classes.users,
														}}
														label="100+"
														value="100+"
														control={<Radio />}
													/>
												</RadioGroup>
											</Grid>
											
										</Grid>
									</Grid>
									<Grid item style={{ marginTop: "5em" }}>
												<Select
													labelId="features"
													style={{width: "10em"}}
													MenuProps={{style: {zIndex: 1302}}}
													id="features"
													multiple
													displayEmpty
													renderValue={
														features.length > 0 ? (undefined) : () => "Features"
													}
													value={features}
													onChange={(event) => setFeatures(event.target.value)}
												>
													{service === "Website" ? featureOption = websiteOptions : null}
													{featureOption.map((option) => (
														<MenuItem key={option} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid container justify="center" style={{marginTop: "3em"}}>
							<Grid item>
								<Button color="primary" style={{fontWeight: 3000}} onClick={() => setDialogOpen(false)}>Cancel</Button>
							</Grid>
							<Grid item>
								<Button 
									variant="contained" 
									className={classes.button} 
									onClick={addProject} 
									disabled={service === "Website" ? name.length === 0 || total.length === 0 || features.length === 0 
									: name.length === 0 || total.length === 0 || features.length === 0 || features.length > 1 || users.length === 0 || complexity.length === 0 || platforms.length === 0}
								>
									Add Project +
								</Button>
							</Grid>
						</Grid>
					</DialogContent>
				</Dialog>
			</Grid>
		</MuiPickersUtilsProvider>
	);
}
