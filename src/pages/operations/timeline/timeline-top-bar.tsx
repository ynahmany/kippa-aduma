import React, { useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import Input from "@material-ui/core/Input";

import { PanelButton, PanelTitle } from "src/components/general/Panel";
import { spaceChildren } from "src/utils/helpers/css";
import { MuiStyles, OperationPost, SetState } from "src/utils/interfaces";
import FormDialog from "src/components/dialogs/FormDialog";

import CreatePostForm from "../create-post-form";

const styles = (theme: Theme) =>
    createStyles({
        flexCenter: {
            display: "flex",
            alignItems: "center",
        },
        titleRoot: {
            justifyContent: "space-between",
            padding: "0 15px",
            height: 50,
        },
        actionsRoot: {
            ...spaceChildren("horizontally", 10),
        },
        searchOpenRight: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
        searchOpenLeft: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            padding: "2px 5px 2px 10px",
            minWidth: "fit-content",
        },
        searchTextField: {
            backgroundColor: theme.constants.appBackgroundHighlight,
            border: "1px solid rgba(255,255,255,0.2)",
            height: 32,
            padding: "2px 10px",
            fontSize: 14,
            borderRadius: 2,
            width: 230,
        },
        searchIcon: {
            marginRight: 5,
            fontSize: 20,
        },
    });

type TimelineTopBarProps = MuiStyles & { onSearch: SetState<string>; searchString?: string; addPost: (newPost: OperationPost) => void };
function TimelineTopBar({ classes, onSearch, searchString, addPost }: TimelineTopBarProps) {
    const [formOpen, setFormOpen] = useState(false);

    const toggleFormOpen = () => setFormOpen((prev) => !prev);

    return (
        <PanelTitle className={clsx(classes.titleRoot, classes.flexCenter)} withBackground>
            <span>Operation Timeline</span>
            <div className={clsx(classes.flexCenter, classes.actionsRoot)}>
                <Input
                    disableUnderline
                    autoFocus
                    placeholder="Search posts by text, type..."
                    value={searchString}
                    onChange={(e) => onSearch(e.target.value)}
                    className={classes.searchTextField}
                    startAdornment={<SearchIcon className={classes.searchIcon} />}
                />
                <PanelButton color="secondary" onClick={toggleFormOpen}>
                    <EditIcon />
                    Create
                </PanelButton>
                <FormDialog title="Create Post" open={formOpen} onClose={toggleFormOpen}>
                    <CreatePostForm addPost={addPost} onClose={toggleFormOpen} />
                </FormDialog>
            </div>
        </PanelTitle>
    );
}

export default withStyles(styles)(TimelineTopBar);
