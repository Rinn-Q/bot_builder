import * as React from 'react';
import { Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem } from '@mui/material';

interface CustomPopperProps {
    open: boolean;
    anchorRef: React.RefObject<HTMLButtonElement>;
    handleClose: (event: Event | React.SyntheticEvent) => void;
}

const CustomPopper: React.FC<CustomPopperProps> = ({ open, anchorRef, handleClose }) => {
    return (
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom-end"
            transition
            disablePortal
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};

export default CustomPopper;
