import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import { MuiStyles, OperationPost } from "interfaces";
import Panel, { PanelButton, PanelStat, PanelTitle } from "src/components/general/Panel";
import { notFirstChild, spaceChildren } from "utils/helpers/css";
import { areSameDates } from "utils/helpers/dates";
import { filterDuplicatesFromArray } from "utils/helpers/objects";
import { OperationPostTypes } from "db/post/model";
import { firstLetterUppercase } from "utils/helpers/strings";

import { PostTypeToColor } from "./timeline/post/post-type-indicator";

const styles = () =>
    createStyles({
        buttons: {
            margin: "10px 0",
            display: "flex",
            flexDirection: "column",
            ...spaceChildren("vertically", 10),
            "& > *": {
                height: 40,
            },
        },
        icon: { marginRight: "10px !important" },
        stats: {
            "& > *": {
                marginTop: 10,
                minHeight: 100,
            },
            ...notFirstChild({ marginTop: 20 }),
        },
        userText: {
            fontStyle: "italic",
            fontWeight: "bold",
        },
        postTypeLine: {
            display: "flex",
            alignItems: "center",
            marginTop: 6,
            textAlign: "center",
            justifyContent: "center",
            "& > *": {
                margin: "0 4px",
            },
        },
    });

type AdvancedOverviewPanelProps = MuiStyles & { className: string; posts: OperationPost[] };
function AdvancedOverviewPanel({ classes, className, posts }: AdvancedOverviewPanelProps) {
    const postsFromToday = posts.filter((post) => areSameDates(new Date(), post.writtenAt));
    const todaysPostAuthors = filterDuplicatesFromArray(postsFromToday.map((post) => post.author.nickname));

    const postsCountByType = posts.reduce<Record<OperationPostTypes, number>>((agg, { type }) => {
        /* eslint-disable no-param-reassign */
        if (agg[type]) agg[type] += 1;
        else agg[type] = 1;
        /* eslint-enable no-param-reassign */
        return agg;
    }, {} as any);

    const postTypesUsedCount = Object.keys(postsCountByType).length;

    return (
        <Panel className={className}>
            <PanelTitle>Advanced Options</PanelTitle>
            <div className={classes.buttons}>
                <PanelButton>
                    <SaveAltIcon className={classes.icon} />
                    Export as PDF
                </PanelButton>
                To be implemented!
            </div>
            <PanelTitle>Overview</PanelTitle>
            <div className={classes.stats}>
                <PanelStat title={`${posts.length} Posts written overall`}>since operation started</PanelStat>
                <PanelStat title={`${postsFromToday.length} Post${postsFromToday.length !== 1 ? "s" : ""} written today`}>
                    {todaysPostAuthors.length !== 1 ? (
                        `by ${todaysPostAuthors.length} different people`
                    ) : (
                        <>
                            By User <span className={classes.userText}>{todaysPostAuthors[0]}</span>
                        </>
                    )}
                </PanelStat>
                <PanelStat title={postTypesUsedCount === 1 ? "One post type used:" : `${postTypesUsedCount} post types used:`}>
                    {postTypesUsedCount === 0
                        ? "(none used)"
                        : Object.entries(postsCountByType).map(([key, value]) => (
                              <div key={key} className={classes.postTypeLine}>
                                  <i style={{ color: PostTypeToColor[key] }}>{firstLetterUppercase(key)}</i>{" "}
                                  <span>
                                      ({value} post{value !== 1 ? "s" : ""})
                                  </span>
                              </div>
                          ))}
                </PanelStat>
            </div>
        </Panel>
    );
}

export default withStyles(styles)(React.memo(AdvancedOverviewPanel));