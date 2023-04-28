import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, {
    type OutlinedInputProps,
} from '@mui/material/OutlinedInput';
import React from 'react';

type PropsType = OutlinedInputProps & {
    inputerror: {
        error?: boolean;
        helperText?: string;
    };
};

const PasswordInput = (props: PropsType): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ): void => {
        event.preventDefault();
    };

    return (
        <FormControl
            variant="outlined"
            fullWidth={props.fullWidth ?? true}
            margin={props.margin ?? 'dense'}
            error={
                props.inputerror.error === true &&
                Boolean(props.inputerror.helperText)
            }
        >
            <InputLabel htmlFor="outlined-adornment-password">
                {props.label}
            </InputLabel>

            <OutlinedInput
                id="outlined-adornment-password"
                aria-describedby="outlined-weight-helper-text"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
                {...props}
            />
            {props.inputerror.error === true ? (
                <FormHelperText
                    id="outlined-weight-helper-text"
                    error={props.inputerror.error}
                >
                    {props.inputerror.helperText}
                </FormHelperText>
            ) : null}
        </FormControl>
    );
};

export default PasswordInput;
