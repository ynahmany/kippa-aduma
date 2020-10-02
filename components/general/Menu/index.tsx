import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Popover, { PopoverProps } from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import { SvgIconComponent } from "@material-ui/icons";
import { MuiStyles } from "interfaces";

const styles = (theme: Theme) =>
    createStyles({
        menuItemWrapper: {
            display: "flex",
            alignItems: "center",
            padding: "5px 0",
        },
        menuItemIcon: {
            marginRight: 12,
        },
    });

type MenuItem = {
    title: string;
    icon?: SvgIconComponent;
    onClick?: React.MouseEventHandler;
};

type MenuProps = MuiStyles &
    PopoverProps & {
        anchorEl: PopoverProps["anchorEl"];
        onClose: PopoverProps["onClose"];
        items: Array<MenuItem>;
    };

function Menu(props: MenuProps) {
    const { classes, items, ...popoverProps } = props;

    return (
        <Popover {...popoverProps}>
            {items.length > 0 &&
                items.map((menuItem, index) => {
                    const Icon = menuItem.icon;
                    return (
                        <MenuItem key={menuItem.title} divider={index !== items.length - 1} onClick={menuItem.onClick}>
                            <div className={classes.menuItemWrapper}>
                                {Icon && <Icon className={classes.menuItemIcon} />} {menuItem.title}
                            </div>
                        </MenuItem>
                    );
                })}
        </Popover>
    );
}

export default withStyles(styles)(Menu);