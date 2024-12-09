"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonData } from "./redux/slice";
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

const Page = () => {
  const [pokemonName, setPokemonName] = useState("pikachu");
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (pokemonName) {
      dispatch(fetchPokemonData(pokemonName));
    }
  }, [pokemonName, dispatch]);

  const handleSearch = () => {
    const name = prompt("Enter Pokemon name:");
    if (name) {
      setPokemonName(name.toLowerCase());
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pokemon Info
      </Typography>

      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search Pokemon
      </Button>

      {status === "loading" && <CircularProgress sx={{ marginTop: 4 }} />}
      {status === "failed" && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {status === "succeeded" && data && (
        <Card sx={{ maxWidth: 345, marginTop: 4, margin: "auto" }}>
          <img src={data.sprites.front_default} alt={data.name} />
          <CardContent>
            <Typography variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Height: {data.height} decimeters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weight: {data.weight} hectograms
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Page;
