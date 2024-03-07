// InfoPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import arrowLeft from "./img/header/arrow-left.svg";
import home from "./img/header/home.svg";
import tool from "./img/slider/tool.svg";
import map from "./img/map/map.svg";
import useFetch from "../../components/hooks/useFetch.js";
import FilterPage from "../filterPage/Filter.jsx";
import SortedPosts from "../../components/SortedPosts.jsx";
import cl from "./page2.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryTitle } from "../../actions.js"; // Update the path accordingly

const InfoPage = () => {
  const loadPostsByCategory = (categoryId) => {
    console.log(`Loading posts for category: ${categoryId}`);
    // Your logic to load posts based on the category goes here
  };

  const categoryTitles = {
    encodedCategory1: 'Категория 1',
    encodedCategory2: 'Категория 2',
    // Add other categories as needed
  };

  const [showFilterPage, setShowFilterPage] = useState(false);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const encodedCategory = pathParts[pathParts.length - 1];
  const initialCategoryId = categoryTitles[encodedCategory] || encodedCategory;

  const { data, loading, error } = useFetch(
      `https://places-test-api.danya.tech/api/categories?populate=image`
  );

  useEffect(() => {
    console.log("Categories API response:", data);
  }, [data]);

  const [localData, setLocalData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategoryId);
  const [localCategoryTitle, setLocalCategoryTitle] = useState(initialCategoryId);
  const categoryTitleRedux = useSelector((state) => state.title.categories[activeCategory]);
  const dispatch = useDispatch();

  const loopClick = () => {
    setShowFilterPage(true);
    document.body.style.overflow = "hidden";
  };

  const handleFilterPageClose = () => {
    setShowFilterPage(false);
    document.body.style.overflow = "auto";
  };

  const handleCategoryClick = async (categoryId, categoryTitle) => {
    if (activeCategory === categoryId) {
      return;
    }

    document.querySelectorAll(`.${cl.tab}`).forEach((tab) => {
      tab.classList.remove(cl.active);
    });

    setActiveCategory(categoryId);
    setLocalCategoryTitle(categoryTitles[categoryId] || "ИНТЕРЕСНЫЕ МЕСТА");

    // Load posts for the selected category
    await loadPostsByCategory(categoryId);

    // Dispatch the action to update the category title in Redux store
    dispatch(setCategoryTitle(categoryId, categoryTitle || "ИНТЕРЕСНЫЕ МЕСТА"));
    localStorage.setItem("categoryTitle", categoryTitle || "ИНТЕРЕСНЫЕ МЕСТА");
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadPostsByCategory(activeCategory);
    };

    fetchData();
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const storedCategoryTitle = localStorage.getItem("categoryTitle");

    if (storedCategoryTitle && storedCategoryTitle !== "undefined") {
      console.log("Setting categoryTitle from localStorage:", storedCategoryTitle);
      dispatch(setCategoryTitle(activeCategory, storedCategoryTitle));
      setLocalCategoryTitle(storedCategoryTitle);
    } else {
      console.log("Setting default categoryTitle");
      dispatch(setCategoryTitle(activeCategory, "ИНТЕРЕСНЫЕ МЕСТА"));
      localStorage.setItem("categoryTitle", "ИНТЕРЕСНЫЕ МЕСТА");
    }
  }, []); // Empty dependency array to ensure it runs only once when t
  useEffect(() => {
    if (!loading && !error && data && data.attributes && data.attributes.posts) {
      console.log("SortedPosts - Data received:", data);
      setLocalData(data.attributes.posts.data || []);
    }
  }, [data, loading, error, activeCategory]);

  return (
      <>
        {showFilterPage && (
            <div className={cl.filterPageOverlay}>
              <div className={cl.modalContainer} onClick={handleFilterPageClose}>
                <FilterPage handleFilterPageClose={handleFilterPageClose} />
              </div>
            </div>
        )}
        <header className={cl.header}>
          <Link to="/">
            <div className={`${cl.header__container} ${cl._container}`}>
              <a href="#" className={cl.header__icon}>
                <img src={arrowLeft} alt="" />
              </a>
              <a href="#" className={cl.header__icon}>
                <img src={home} alt="" />
              </a>
            </div>
          </Link>
        </header>

        <section className={`${cl.page__food} ${cl.food}`}>
          <div className={`${cl.wrapper} ${cl._container}`}>
            <ul className={cl.tabs_box}>
              {data &&
                  data.map((cat) => (
                      <li
                          key={cat.id}
                          className={`${cl.tab} ${
                              location.pathname.includes(`/page2/${cat.id}`) ? cl.active : ""
                          }`}
                          onClick={() => handleCategoryClick(cat.id, cat.attributes.title)}
                      >
                        <img
                            className={cl.button__image}
                            src={`https://places-test-api.danya.tech${cat.attributes.image.data.attributes.url}`}
                            alt=""
                        />
                        <span className={cl.tab__text}>{cat.attributes.title}</span>
                      </li>
                  ))}
            </ul>
          </div>

          <div className={`${cl.food__header} ${cl._container}`}>
            <div className={cl.food__content}>
              <div className={cl.food__title}>{categoryTitleRedux || localCategoryTitle}</div>
              <div className={cl.food__desc}>
                Нажмите на кнопку «фильтры», чтобы выбрать наиболее подходящее место
              </div>
            </div>
            <div className={cl.food__icon}>
              <img onClick={loopClick} src={tool} alt="" />
            </div>
          </div>

          {(categoryTitleRedux || localCategoryTitle) && (
              <SortedPosts
                  categoryId={activeCategory}
                  categoryTitle={categoryTitleRedux || localCategoryTitle}
              />
          )}
        </section>

        <section className={`${cl.page__map} ${cl.map}`}>
          <div className={`${cl.map__container} ${cl._container}`}>
            <div className={cl.map__content}>
              <div className={cl.map__title}>Онлайн-карта</div>
              <div className={cl.map__desc}>
                Интерактивная карта в Google Maps с местами города. Ищите новые места <p>рядом с вами!</p>
              </div>
            </div>
            <img src={map} alt="" />
            <a className={cl.map_btn}>ОТКРЫТЬ ОНЛАЙН-КАРТУ</a>
          </div>
        </section>
      </>
  );
};

export default InfoPage;
