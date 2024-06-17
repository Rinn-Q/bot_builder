import * as React from 'react';
import { Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface CustomPopperProps {
    open: boolean;
    anchorRef: React.RefObject<HTMLButtonElement>;
    handleClose: (event: Event | React.SyntheticEvent) => void;
    handlePopup: () => void;
    buttonData: Button[]
}

interface Button {
    title : String;
    icon : OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

const CustomPopper: React.FC<CustomPopperProps> = ({ open, anchorRef, handleClose , buttonData,handlePopup}) => {
    const handleMenuItemClick = (event: Event | React.SyntheticEvent) => {
        handlePopup();
        handleClose(event);
    };
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
                                {buttonData.map((e)=>
                                <MenuItem onClick={
                                    handleMenuItemClick
                                }>
                                    <e.icon></e.icon>
                                    {e.title}
                                    </MenuItem>
                                )}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};

export default CustomPopper;
