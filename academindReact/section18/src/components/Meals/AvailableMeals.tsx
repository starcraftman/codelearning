import React from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem, { MealItemType } from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const requestConfig = {
  url: 'https://react-http-51865-default-rtdb.firebaseio.com/meals.json',
  method: "GET",
}

interface MealData {
  name: MealItemType
};
const AvailableMeals = () => {
  const [allMeals, setAllMeals] = React.useState([] as React.ReactNode[]);
  const { isLoading, error, sendRequest: getMeals } = useHttp();

  React.useEffect(() => {
    const processMeals = (data: MealData) => {
      console.log('data response', data);  // FIXME: Why two fetches?
      const allMeals = Object.entries(data).map(([mealId, mealItem]) => {
        mealItem.id = mealId;
        return <MealItem key={mealId} meal={mealItem} />
      });
      setAllMeals(allMeals);
    }

    getMeals(requestConfig, processMeals);
   }, [getMeals]);

  let mealsContent = (
      <section className={styles.meals}>
        <Card>
          <ul>{allMeals}</ul>;
        </Card>
      </section>
  );

  if (isLoading) {
    mealsContent = (
      <section className={styles['meals-loading']}>
        <p>Loading ...</p>
      </section>
    )
  } else if (error) {
    mealsContent = (
      <section className={styles['meals-error']}>
        <p>Problem retrieving menu: {error}</p>
      </section>
    )
  }

  return mealsContent;
}

export default AvailableMeals;
