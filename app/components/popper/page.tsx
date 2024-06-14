'use client'

import * as React from 'react';
import { Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem, Icon, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface ButtonProperties{
    title : String,
    icon : OverridableComponent<SvgIconTypeMap<{}, "svg">>,
}

interface CustomPopperProps {
    open: boolean;
    anchorRef: React.RefObject<HTMLButtonElement>;
    handleClose: (event: Event | React.SyntheticEvent) => void;
    buttonData : Array<ButtonProperties>
}

const CustomPopper: React.FC<CustomPopperProps> = ({ open, anchorRef, handleClose,buttonData }) => {
    const [ data , setButtonData ] = React.useState<ButtonProperties[]>([]);

    React.useEffect(() => {
        setButtonData(buttonData);
    }, []);
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
                                {data?.map((e)=>(
                                    <MenuItem onClick={handleClose} sx={{margin:1}} >
                                    <e.icon></e.icon>
                                    {e.title}
                                    </MenuItem>
                                )
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
