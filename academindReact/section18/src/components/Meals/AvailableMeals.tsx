import React from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem, { MealItemType } from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const requestConfig = {
  url: 'https://react-http-51865-default-rtdb.firebaseio.com/meals.json',
  method: "GET",
}

const AvailableMeals = () => {
  const [allMeals, setAllMeals] = React.useState([] as any[]);
  const { isLoading, error, sendRequest: getMeals } = useHttp();

  React.useEffect(() => {
    const processMeals = (data: any) => {
      console.log('data response', data);  // FIXME: Why two fetches?
      let allMeals = [];
      for (const [mealId, mealItem] of Object.entries(data)) {
        allMeals.push(<MealItem key={mealId} meal={mealItem as MealItemType} />)
      }
      setAllMeals(allMeals);
    }

    getMeals(requestConfig, processMeals);
   }, [getMeals]);

  return (
    <section className={styles.meals}>
      <Card>
        {!isLoading && allMeals.length === 0 && <p>No meals available at this time.</p>}
        {isLoading && <p>Fetching the available meals.</p>}
        {!isLoading && !error && <ul>{allMeals}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
