import { useEffect, useState } from 'react';

import cl from './page3.module.css'
import yellow_heart from '../categoryPage/imgs/main/section__publications/icons/yellow_heart.svg'
import arrowLeft from './img/arrow-left.svg'
import heart from './img/heart.svg'
import pic from './img/pic.png'
import pic2 from './img/pic2.png'
import pic3 from './img/pic3.png'
import main1 from './img/main1.svg'
import main2 from './img/main2.svg'
import main3 from './img/main3.svg'
import main4 from './img/main4.svg'
import main5 from './img/main5.svg'
import main6 from './img/main6.svg'
import mainLike from './img/main-like.svg'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {resetButton, setButtonPressed} from "../../features/buttonSlide.js";

const page3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch()
  const {buttons} = useSelector(state => state.button)

  const handleButtonClicker = (buttonId) => {
    if (buttons[buttonId]?.isPressed) {
      dispatch(resetButton({buttonId}))
    } else {
      dispatch(setButtonPressed({buttonId}))
    }
  }

  useEffect(() => {
    showSlide(currentSlide);
  }, [currentSlide]);

  const images = [pic, pic2, pic3, pic2, pic3]; // Repeat the images as needed

  const showSlide = (index) => {
    const slides = document.querySelectorAll(`.${cl.slide}`);
    const circles = document.querySelectorAll(`.${cl.circle}`);

    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
      slide.classList.toggle(cl.active, i === index);
    });

    circles.forEach((circle, i) => {
      circle.classList.toggle(cl.active, i === index);
    });
  };



  const changeSlide = (direction) => {
    setCurrentSlide((prevSlide) => {
      let nextSlide = prevSlide + direction;
      if (nextSlide >= images.length) nextSlide = 0;
      if (nextSlide < images.length - images.length) nextSlide = 2;
      return nextSlide;
    });
  };

  const handleCircleClick = (index) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = (direction) => {
    changeSlide(direction);
  };

  useEffect(() => {
    // Scroll to the top when the component mounts or updates
    window.scrollTo(0, 0);
  }, []);

  return (
      <div>
        <div className={cl.slider}>
          <div className={cl.header}>
            <Link to={'/infoPage'}>
              <div className={cl.back}>
                <img src={arrowLeft} alt="" />
              </div>
            </Link>
            <div className={cl.back}>
              <img src={heart} alt="" />
            </div>
          </div>
          <button className={`${cl.slide_btn} ${cl.left}`} onClick={() => handleButtonClick(-1)}>&#10094;</button>
          <div className={cl.slides}>
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    className={`${cl.slide}`}
                />
            ))}
          </div>
          <button className={`${cl.slide_btn} ${cl.right}`} onClick={() => handleButtonClick(1)}>&#10095;</button>
          <div className={cl.slide_circles}>
            {images.map((_, index) => (
                <div
                    key={index}
                    className={`${cl.circle} ${index === currentSlide ? cl.active : ''}`}
                    onClick={() => handleCircleClick(index)}
                ></div>
            ))}
          </div>
        </div>
        <div className={cl.content}>
          <div className={cl.menu}>
            <div className={`${cl.bg} ${cl.first}`}>
              <p>Еда</p>
            </div>
            <div className={cl.bg}>Ресторан</div>
            <div className={`${cl.bg} ${cl.thirtd}`}>pet-friendly</div>
          </div>
          <h1 className={cl.title}>Ralph на Петроградке</h1>
          <div className={cl.text}>
            Кондитерское производство «Тройка», основанное в 1978 году, является одним из самых известных брендов
            Северной столицы. Легендарную кондитерскую знают и любят не только в родном Петербурге, но и других
            городах.«Тройка» стала одним из первых кондитерских предприятий в России, выпускающим торты и пирожные
            с натуральными взбитыми сливками. <br/> <br/>
            С этих сладких шедевров и небольших хлебобулочных изделий или, как было принято называть раньше,
            «мелкоштучки», началась история производства
          </div>
          <div className={cl.time}>
            <p className={cl.work_time}>Часы работы</p>
            <p className={cl.day}>Пн-Вс: 21:00–19:00</p>
          </div>
          <div className={cl.more}>
            <p className={cl.work_time}>Дополнительно</p>
            <p className={cl.silka}><a className={cl.a} href="https://spbneformal.ru/">https://spbneformal.ru/</a></p>
          </div>
          <div className={cl.adres}>
            <p className={cl.work_time}>Адрес</p>
            <p className={cl.day}>ул. Большевиков, 24</p>
          </div>
          <div className={cl.btn}>
            <p className={cl.btn_btn}>Показать на карте</p>
          </div>
        </div>
        <div className={cl.main}>
          <h1 className={cl.qwe}>Похожие места</h1>

          <div className={cl.cards}>

            <div className={cl.card}>
              <img src={main1} alt="" className={cl.asd} />
              <button onClick={() => handleButtonClicker(1)} className={cl.main_like}>
                <img src={buttons[1]?.isPressed ? yellow_heart : heart} alt="" />
              </button>
              <div className={cl.main_matin}>
                <p className={cl.main_text}>Места за городом</p>
                <p className={cl.main_sub}>Гончарная студия на побережье</p>
              </div>
            </div>

            <div className={cl.card}>
              <img src={main2} alt="" className={cl.asd} />
              <button onClick={() => handleButtonClicker(2)} className={cl.main_like}>
                <img src={buttons[2]?.isPressed ? yellow_heart : heart} alt="" />
              </button>
              <div className={cl.main_matin}>
                <p className={cl.main_text}>базы отдыха</p>
                <p className={cl.main_sub}>We Lodge</p>
              </div>
            </div>

            <div className={cl.card}>
              <img src={main3} alt="" className={cl.asd} />
              <button onClick={() => handleButtonClicker(3)} className={cl.main_like}>
                <img src={buttons[3]?.isPressed ? yellow_heart : heart} alt="" />
              </button>
              <div className={cl.main_matin}>
                <p className={cl.main_text}>КОНЦЕРТ</p>
                <p className={cl.main_sub}>Концерт в студии при свечах</p>
              </div>
            </div>
            <div className={cl.card}>
              <img src={main4} alt="" className={cl.asd} />
              <button onClick={() => handleButtonClicker(4)} className={cl.main_like}>
                <img src={buttons[4]?.isPressed ? yellow_heart : heart} alt="" />
              </button>
              <div className={cl.main_matin}>
                <p className={cl.main_text}>Места за городом</p>
                <p className={cl.main_sub}>Вивальди. Времена года</p>
              </div>
            </div>

            <div className={cl.card}>
              <img src={main5} alt="" className={cl.asd} />
              <button onClick={() => handleButtonClicker(5)} className={cl.main_like}>
                <img src={buttons[5]?.isPressed ? yellow_heart : heart} alt="" />
              </button>
              <div className={cl.main_matin}>
                <p className={cl.main_text}>КОНЦЕРТ</p>
              </div>
            </div>

            <div className={cl.card}>
              <img src={main6} alt="" className={cl.asd} />
              <button onClick={() => handleButtonClicker(6)} className={cl.main_like}>
                <img src={buttons[6]?.isPressed ? yellow_heart : heart} alt="" />
              </button>
              <div className={cl.main_matin}>
                <p className={cl.main_text}>КОНЦЕРТ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default page3