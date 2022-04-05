import { useState, useRef } from "react";

import { Box, TextField, Typography, Button } from "@material-ui/core";

import { Controller, useForm } from "react-hook-form";

export default function App() {
  const passwordRef = useRef();

  const [error, setError] = useState("");

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  const save = handleSubmit(async (data) => {
    if (error) return;
    alert("Password guardada com sucesso");
    console.info(data.password);
    return;
  });

  const confirmPasswordMatch = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return setError("Password diff");

    if (confirmPassword !== password) {
      console.error("Diff");
      return setError("Password diff");
    }
    console.log("Match");

    setTimeout(() => {
      console.clear();
    }, 1000);

    return setError("");
  };

  return (
    <Box>
      <Typography variant="h2">Password </Typography>
      <Box style={{ marginBottom: 10 }}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Required"
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              {...register("password", {
                onBlur: (e) => {
                  confirmPasswordMatch("", e.target.value);
                }
              })}
              variant="outlined"
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              error={!!error}
              onChange={onChange}
              value={value}
              inputRef={passwordRef}
              helperText={error ? error.message : null}
            />
          )}
        />
      </Box>
      <Box style={{ marginBottom: 10 }}>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: "Required"
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              {...register("confirmPassword", {
                onBlur: (e) => {
                  const password = passwordRef.current.value;
                  confirmPasswordMatch(password, e.target.value);
                }
              })}
              variant="outlined"
              required
              fullWidth
              id="confirmPassword"
              label="confirmPassword"
              name="confirmPassword"
              error={!!error}
              onChange={onChange}
              value={value}
              helperText={error ? error : null}
            />
          )}
        />
      </Box>
      <Button variant="contained" onClick={save}>
        Guardar
      </Button>
    </Box>
  );
}
