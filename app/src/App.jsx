import { useEffect, useState } from "react";
import styled from "styled-components";
import createGlobalStyle from "styled-components";
import { Searchresult } from "./components/searchresult";

export const BASE_URL = "http://localhost:9000";
// const arr = [
//   {
//     name: "All",
//     type: "all",
//   },
//   {
//     name: "Breakfast",
//     type: "breakfast",
//   },
//   {
//     name: "Lunch",
//     type: "lunch",
//   },
//   {
//     name: "Dinner",
//     type: "dinner",
//   },
// ];

function App() {
  const [data, setdat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedbtn] = useState("all");
  useEffect(() => {
    const fetchFooddata = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setdat(json);
        setFilterData(json);
        console.log(json);
      } catch (error) {
        SetError("unable to fetch data");
      }
    };
    fetchFooddata();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilterData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  const filterFood = (type) => {
    if (type == "all") {
      setFilterData(data);
      setSelectedbtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedbtn(type);
  };

  const arr = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  return (
    <>
      <Container>
        <TopContaoner>
          <div className="logo">
            <img src="../public/Foody Zone@2x.png" alt="logo" />
          </div>
          <div>
            <input
              onChange={searchFood}
              type=" text"
              placeholder="Search Food..."
            />
          </div>
        </TopContaoner>
        <FilterContainer>
          {arr.map((value, ind) => {
            return (
              <Button key={ind} onClick={() => filterFood(value.type)}>
                {value.name}
              </Button>
            );
          })}
          {/* <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button>Lunch</Button>
          <Button>Dinner</Button> */}
        </FilterContainer>
      </Container>
      <Searchresult data={filterData}></Searchresult>
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContaoner = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  input {
    width: 285px;
    height: 40px;
    border: 2px solid red;

    border-radius: 5px;

    padding: 5px;
    background-color: transparent;
    color: white;
    font: 16px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  height: 31px;
  min-width: 60px;
  background-color: #ff4343;
  border-radius: 5px;
  color: white;
  border: 1px solid black;
  padding: 5px;
  &:hover {
    background-color: #a11111;
    border: 1px solid white;
  }
`;
