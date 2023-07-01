import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./recipepal.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { faGift } from "@fortawesome/free-solid-svg-icons";

export default function RecipePal() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMinutes, setSelectedMinutes] = useState("");
  const [ingredientValue, setIngredientValue] = useState("");
  const [recipeValue, setRecipeValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [limitedTime, setLimitedTime] = useState(1);
  const [limitedIngredients, setLimitedIngredients] = useState(1);
  const [randomDish, setRandomDish] = useState(1);

  const handleLimitedOption = () => {
    setLimitedTime(2);
    setLimitedIngredients(0);
    setRandomDish(0);
  };

  const handleIngredientsOption = () => {
    setLimitedTime(0);
    setLimitedIngredients(2);
    setRandomDish(0);
  };

  const handleTimeSelection = (e) => {
    setSelectedMinutes(e.target.value);
  };

  const handleNextButtonClick = () => {
    if (selectedMinutes) {
      setLimitedTime(3);
    }
  };

  const handleNextButtonClickIngredients = () => {
    if (selectedMinutes) {
      setLimitedIngredients(4);
    }
  };

  const goBack = () => {
    setLimitedTime((prevStep) => prevStep - 1);

    if (limitedTime === 2) {
      setLimitedIngredients(1);
      setRandomDish(1);
    }
  };

  const goBack1 = () => {
    setLimitedIngredients((prevStep) => prevStep - 1);

    if (limitedIngredients === 2) {
      setLimitedTime(1);
      setRandomDish(1);
    }
  };

  const goBack2 = () => {
    setRandomDish((prevStep) => prevStep - 1);

    if (randomDish === 2) {
      setLimitedTime(1);
      setLimitedIngredients(1);
    }
  };

  const options = [];
  for (let i = 5; i <= 200; i += 5) {
    options.push(
      <option key={i} value={i}>
        {i} minutes
      </option>
    );
  }

  const generateDishes = async () => {
    setLoading(true);

    const promptText = `I am having ${selectedOption} to prepare a dish within ${selectedMinutes} minutes. 
                            These are the ingredients I want to avoid: ${ingredientValue}. 
                            Name the top 5 dishes for a ${selectedOption}, but quick and suitable dishes. 
                            Provide me only the names of the dish.`;
    try {
      const response = await axios.post("/api/openai", { prompt: promptText });
      const generatedDish = response.data.recipes;
      setLimitedTime(5);
      setRecipes(generatedDish);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecipe = async (recipe) => {
    setLoading(true);

    const promptText = `Please write down the recipe for the ${recipe} dish, providing a clear, concise, 
                            and easy-to-follow step-by-step roadmap. Include the temperature and estimated time for each step, 
                            as well as instructions on when to proceed to the next step, indicating the specific number of seconds or minutes in a bullet list`;
    try {
      const response = await axios.post("/api/recipe", { prompt: promptText });
      const generatedRecipe = response.data.recipe;

      const recipeSteps = generatedRecipe
        .split("\n")
        .filter((step) => step !== "");
      const formattedRecipe = recipeSteps.map(
        (step, index) => `${step.trim()}`
      );
      setLimitedTime(6);
      setRecipeValue(formattedRecipe);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const generateLimitedIngredients = async () => {
    setLoading(true);

    const promptText = `I am having ${selectedOption} to prepare a dish within ${selectedMinutes} minutes. 
                            These are the ingredients I have: ${ingredientValue}. 
                            Name the top 5 dishes for ${selectedOption}, but quick and suitable dishes that can be prepared within ${selectedMinutes} minutes. 
                            Provide me only the names of the dish.`;
    try {
      const response = await axios.post("/api/openai", { prompt: promptText });
      const generatedLimitedIngredient = response.data.recipes;
      setLimitedIngredients(5);
      setRecipes(generatedLimitedIngredient);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const generateLimitedRecipeIngredients = async (recipe) => {
    setLoading(true);

    const promptText = `Please write down the recipe for the ${recipe} dish, providing a clear, concise, 
                            and easy-to-follow step-by-step roadmap. Include the temperature and estimated time for each step, 
                            as well as instructions on when to proceed to the next step, indicating the specific number of seconds or minutes in a bullet list`;
    try {
      const response = await axios.post("/api/recipe", { prompt: promptText });
      const generatedRecipe = response.data.recipe;

      const recipeSteps = generatedRecipe
        .split("\n")
        .filter((first) => first !== "");
      const formattedRecipe = recipeSteps.map(
        (first, index) => `${first.trim()}`
      );
      setLimitedIngredients(6);
      setRecipeValue(formattedRecipe);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const generateRandomDish = async () => {
    setLimitedTime(0);
    setLimitedIngredients(0);
    setLoading(true);

    const promptText = `You are a random dish generator. 
                            I am looking for a surprising dish to prepare for a occasion. 
                            Please suggest a name for a random dish that combines ingredients and flavors. 
                            Provide me only with the name of the dish`;

    try {
      const response = await axios.post("/api/single", { prompt: promptText });
      const generatedDish = response.data.recipes;
      setRecipes(generatedDish);
      setRandomDish(2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const generateRandomRecipe = async (recipe) => {
    const promptText = `Please write down the recipe for the ${recipe} dish, providing a clear, concise, 
                            and easy-to-follow step-by-step roadmap. Include the temperature and estimated time for each step, 
                            as well as instructions on when to proceed to the next step, indicating the specific number of seconds or minutes in a bullet list`;
    try {
      const response = await axios.post("/api/recipe", { prompt: promptText });
      const generatedRecipe = response.data.recipe;

      const recipeSteps = generatedRecipe
        .split("\n")
        .filter((first) => first !== "");
      const formattedRecipe = recipeSteps.map(
        (first, index) => `${first.trim()}`
      );
      setRandomDish(3);
      setRecipeValue(formattedRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.section}>
      {limitedTime === 1 && limitedIngredients === 1 && randomDish === 1 && (
        <h1>Select your plan</h1>
      )}

      <div className={styles.firstStep}>
        {limitedTime === 1 && (
          <button
            className={styles.button}
            onClick={() => handleLimitedOption("limited time")}
          >
            <FontAwesomeIcon
              icon={faClock}
              style={{ color: "#ffcd4d" }}
              size="5x"
              bounce
            />
            <span>Cooking Time</span>
          </button>
        )}

        {limitedIngredients === 1 && (
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => handleIngredientsOption("limited ingredients")}
            >
              <FontAwesomeIcon
                icon={faPepperHot}
                style={{ color: "#9f0404" }}
                size="5x"
                flip
              />
              <span>Limited Ingredients</span>
            </button>
          </div>
        )}
        
        {randomDish === 1 && (
          <button className={styles.button} onClick={generateRandomDish}>
            <FontAwesomeIcon
              icon={faGift}
              style={{ color: "#68B9BD" }}
              size="5x"
              shake
            />
            <span>Select your random dish</span>
          </button>
        )}
      </div>

      {limitedTime === 2 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack}>
            Go back
          </button>
          <h3 className={styles.h3}>Estimated preparation time</h3>
          <div className={styles.inputContainer}>
            <select
              className={styles.dropDown}
              id="time-dropdown"
              value={selectedMinutes}
              onChange={handleTimeSelection}
            >
              <option value="">Select an option</option>
              {options}
            </select>
            <button
              className={styles.buttonSubmit}
              onClick={() => handleNextButtonClick()}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {limitedTime === 3 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack}>
            Go back
          </button>
          <h3 className={styles.h3}>
            Are there specific ingredients you would like to avoid?
          </h3>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={ingredientValue}
              onChange={(e) => setIngredientValue(e.target.value)}
              className={styles.inputBox}
            />
            <button
              className={styles.buttonSubmit}
              onClick={() => setLimitedTime(4)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {limitedTime === 4 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack}>
            Go back
          </button>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          )}

          <h3 className={styles.h3}>Your dish is almost ready!</h3>
          <div className={styles.pResult}>
            <p>
              Summary: I am having {selectedOption} to prepare a dish within{" "}
              {selectedMinutes} minutes. These are the ingredients I want to
              avoid: {ingredientValue}.
            </p>
          </div>
          <button
            className={styles.buttonGenerateDish}
            onClick={generateDishes}
          >
            Collect your customized dish
          </button>
        </div>
      )}

      {limitedTime === 5 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack}>
            Go back
          </button>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          )}

          <div className={styles.result}>
            {recipes.length > 0 && (
              <>
                <h4 className={styles.h4}>Your suitable dish</h4>
                <ul>
                  {recipes.map((recipe, index) => (
                    <button
                      className={styles.buttonResult}
                      onClick={() => generateRecipe(recipe)}
                      key={index}
                    >
                      {recipe}
                    </button>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {limitedTime === 6 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack}>
            Go back
          </button>
          {recipeValue.length > 0 && (
            <div className={styles.finalResult}>
              <h1>Recipe ingredients:</h1>
              <ul>
                {recipeValue.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {limitedIngredients === 2 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack1}>
            Go back
          </button>
          <h3 className={styles.h3}>
            Please list all the ingredients you have
          </h3>
          <div className={styles.inputContainer}>
            <textarea
              type="text"
              value={ingredientValue}
              onChange={(e) => setIngredientValue(e.target.value)}
              className={styles.inputBox}
            />
            <button
              className={styles.buttonSubmit}
              onClick={() => setLimitedIngredients(3)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {limitedIngredients === 3 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack1}>
            Go back
          </button>
          <h3 className={styles.h3}>
            How much time do you want to spend on cooking?
          </h3>
          <div className={styles.inputContainer}>
            <select
              className={styles.dropDown}
              id="time-dropdown"
              value={selectedMinutes}
              onChange={handleTimeSelection}
            >
              <option value="">Select an option</option>
              {options}
            </select>
            <button
              className={styles.buttonSubmit}
              onClick={() => handleNextButtonClickIngredients(4)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {limitedIngredients === 4 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack1}>
            Go back
          </button>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          )}

          <h3 className={styles.h3}>Your dish is almost ready!</h3>
          <div className={styles.pResult}>
            <p>
              Summary: I am having {selectedOption} to prepare a dish within{" "}
              {selectedMinutes} minutes. These are the ingredients I own:{" "}
              {ingredientValue}.
            </p>
          </div>
          <button
            className={styles.buttonGenerateDish}
            onClick={generateLimitedIngredients}
          >
            Collect your customized dish
          </button>
        </div>
      )}

      {limitedIngredients === 5 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack1}>
            Go back
          </button>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          )}

          <div className={styles.result}>
            {recipes.length > 0 && (
              <>
                <h4 className={styles.h4}>Your suitable dish</h4>
                <ul>
                  {recipes.map((recipe, index) => (
                    <button
                      className={styles.buttonResult}
                      onClick={() => generateLimitedRecipeIngredients(recipe)}
                      key={index}
                    >
                      {recipe}
                    </button>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {limitedIngredients === 6 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack1}>
            Go back
          </button>
          {recipeValue.length > 0 && (
            <div className={styles.finalResult}>
              <h1>Recipe ingredients:</h1>
              <ul>
                {recipeValue.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {randomDish === 2 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack2}>
            Go back
          </button>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          )}

          <div className={styles.result}>
            {recipes.length > 0 && (
              <>
                <h4 className={styles.h4}>Your suitable dish</h4>
                <ul>
                  {recipes.map((recipe, index) => (
                    <button
                      className={styles.buttonResult}
                      onClick={() => generateRandomRecipe(recipe)}
                      key={index}
                    >
                      {recipe}
                    </button>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {randomDish === 3 && (
        <div className={styles.stepBox}>
          <button className={styles.buttonGoBack} onClick={goBack2}>
            Go back
          </button>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          )}
          {recipeValue.length > 0 && (
            <div className={styles.finalResult}>
              <h1>Recipe ingredients:</h1>
              <ul>
                {recipeValue.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
