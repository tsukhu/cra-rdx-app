import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Counter from "../features/counter/Counter";
import Order from "../features/order/Order";
import Posts from "../features/posts/Posts";
import PostsXState from "../features/posts/PostsXState";
import PaginatedList from "./PaginatedList";
import TodoApp from "../features/todo/TodoApp";
import MobXTodoApp from "../features/mobx/MobXTodoApp";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: "100vh",
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function AppTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Counter" {...a11yProps(0)} />
        <Tab label="Wizard Form" {...a11yProps(1)} />
        <Tab label="Posts" {...a11yProps(2)} />
        <Tab label="Paginated List" {...a11yProps(3)} />
        <Tab label="Posts XState" {...a11yProps(4)} />
        <Tab label="ToDo App" {...a11yProps(5)} />
        <Tab label="Bugs (MobX)" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Counter />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Order />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PaginatedList />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PostsXState />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TodoApp />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <MobXTodoApp/>
      </TabPanel>
    </div>
  );
}
