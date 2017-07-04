import React from 'react';
import styles from './styles.css';

const FooterContainer = () => (
  <div className={styles.footer}>
    <svg
      className={styles.logoSvg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 595 227"
    >
      {/* eslint-disable-next-line */}
      <path
        fill="#FFF"
        d="M256 162.4c-.2-1.6 1-3 2.6-3.2h1.6c1.6-.2 3 1 3.2 2.6V183H256v-20.6zm12.9.2c0-2.3 1-3.4 2.9-3.4h.6c1.4-.1 2.7.5 3.4 1.7l8.4 10.9v-12.6h6.9v20.4c0 2.3-1 3.4-2.9 3.4h-.6c-1.3.2-2.6-.5-3.1-1.7l-8.6-11.1v12.6H269l-.1-20.2zm26 0c0-2.1 1.3-3.2 3.4-3.2h15.1c2.3 0 3.4 1 3.4 2.9v.2c0 2.1-1 3.2-3.4 3.2h-3.8V183h-7.3v-17.2h-4c-2.1-.1-3.4-1.1-3.4-3.2m25.8 16.8v-16c0-2.5 1.3-4 3.8-4h15.8v6.3h-12.2v2.3h9v5.9h-9v2.7h12.2v6.3h-16c-1.8.2-3.4-1-3.6-2.8v-.7m36.2.8l-3.4-4.4h-1.3v7.4h-7.4v-19.5c0-2.5 1.3-4 3.8-4h7.4c6.5 0 9.9 2.7 9.9 7.8.2 3.2-1.9 6.1-5 6.9l5.2 6.5c.2.2-1 2.5-4.2 2.5-2.1-.1-4-1.3-5-3.2m-4.9-9.6h3.2c2.1 0 3.4-1 3.4-2.7 0-1.9-1-2.7-3.4-2.7h-2.9v5.5l-.3-.1zm18.5-8c0-2.3 1-3.4 2.9-3.4h.6c1.4-.1 2.7.5 3.4 1.7l8.4 10.9v-12.6h6.9v20.4c0 2.3-1 3.4-2.9 3.4h-.6c-1.3.2-2.6-.5-3.2-1.7l-8.6-11.1v12.6h-6.9v-20.2zm42.1 15.5H405l-1.9 4.8h-7.4l8.4-21.8c.4-1.3 1.3-2.1 4.6-2.1 3.4 0 4.2.8 4.6 2.1l8.8 21.8h-7.6l-1.9-4.8zm-6.3-5.2h5l-2.5-6.9-2.5 6.9zm17.4-10.3c0-2.1 1.3-3.2 3.4-3.2h15.1c2.3 0 3.4 1 3.4 2.9v.2c0 2.1-1 3.2-3.4 3.2h-3.8V183H431v-17.2h-4c-2.2-.1-3.3-1.1-3.3-3.2m25.8-.2c-.2-1.6 1-3 2.6-3.2h1.6c1.6-.2 3 1 3.2 2.6V183h-7.4v-20.6zm12 8.8c-.2-6.6 5-12.2 11.6-12.4h.7c7.4 0 12.4 5 12.4 12.4 0 6.8-5.6 12.4-12.4 12.4-6.7 0-12.3-5.6-12.3-12.4m17.7 0c0-3.4-2.1-5.9-5.2-5.9s-5.2 2.3-5.2 5.9 2.1 5.9 5.2 5.9 5.2-2.3 5.2-5.9m11.7-8.6c0-2.3 1-3.4 2.9-3.4h.6c1.4-.1 2.7.5 3.4 1.7l8.4 10.9v-12.6h6.9v20.4c0 2.3-1 3.4-2.9 3.4h-.6c-1.3.2-2.6-.5-3.2-1.7l-8.6-11.1v12.6h-6.9v-20.2zm42.1 15.5h-7.6l-1.9 4.8h-7.4l8.4-21.8c.4-1.3 1.3-2.1 4.6-2.1s4.2.8 4.6 2.1l8.9 21.8H535l-2-4.8zm-6.5-5.2h5L529 166l-2.5 6.9zm18.8-10.3c0-2.3 1-3.4 3.2-3.4h1c2.1 0 3.2 1 3.2 3.4v14.1h7.1c2.3 0 3.4 1 3.4 2.9v.3c0 2.1-1 3.2-3.4 3.2h-14.5v-20.5zM254.1 68.7c0-9 4.4-13.9 12.8-13.9h21.4c23.1 0 35.7 10.1 35.7 29.4S311.9 113 289 113h-9.7v22.7h-25.2v-67zm24.8 26h9.2c7.6 0 11.6-3.8 11.6-10.5s-4.2-10.5-12-10.5h-8.8v21zM331 66c0-8 3.6-11.6 10.5-11.6h3.6c7.1 0 10.9 3.8 10.9 11.6v48.1h24.6c7.8 0 11.6 3.6 11.6 10.3v.4c0 7.1-3.8 10.9-11.6 10.9h-49.8V66h.2zm119 53.1h-26.3l-6.3 16.8h-25l29-74.8c1.3-4 4.6-6.9 16-6.9s14.3 2.9 15.6 6.9l30.2 74.8h-26.5l-6.7-16.8zM428.1 101h17.4l-8.8-23.5-8.6 23.5zm58-35c0-7.8 3.8-11.6 10.3-11.6h2.3c5.9 0 7.8 1.7 11.3 5.9l29 37.8V54.8h23.5v70c0 7.8-3.8 11.6-10.1 11.6h-2.1c-6.1 0-7.8-1.5-11.1-5.5l-29.6-38.4v43.3h-23.5V66zM55 63.4c-1.7 1-9.5 9.2-10.3 10.5-.4.6-1.9 3.2-2.1 3.4-.2.2-1.3 1.7-1.5 1.9-.2.2-1 2.7-1.3 2.9-.4.6-1.7 1.7-1.9 2.1.3 1.3-.2 2.6-1.3 3.4-1.3 1-2.1 5.2-2.3 5.5-.2.8-1.9 2.7-1.7 4.4 0 .8-.3 1.6-.8 2.1-.2.6-.2 2.7-1.5 3.2-1 .4-.6 2.1-.4 2.7.5 1 .6 2.1.2 3.2-.2.7-.1 1.5.2 2.2.8 1.3 0 3.4-.2 4-.2 3.8 2.3 4.8 1.7 7.1-.4 1.5.4 2.5.2 4 0 .8.3 1.6.8 2.1.4.8.7 1.6.8 2.5-.4 2.1 2.7 5 2.5 8-.2 2.5 2.9 3.8 3.2 4 1.5 1.9 1.5 4 3.2 5 .7.6 1.4 1.1 2.1 1.5 1 .6 0 1.3.2 1.5 1 1.8 2.3 3.4 4 4.6 6.5 7.6 22.1 17.2 23.8 17.4 1.5 0 2.9.6 4 1.5 2.2 1.3 4.5 2.3 6.9 3.2.8.4 1.7.2 2.5.6.8.2 5.7 2.1 6.3 2.3 1.8.8 3.7 1.5 5.7 1.9 1.5.4 3.2 1.3 4.8 1.7 1.9.4 3.4-1.3 4.8-.2 1.6.9 3.3 1.5 5 1.9 7.8 1.7 18.9 2.1 26.7 1.7 1.7.4 3.5.4 5.2 0 2.7-.2 5.9-1 8.6-1.3 4-1 8.6-2.1 12.4-4 1.3-.2 2.7-1.7 3.6-1.9 1.7-.8 3.3-1.8 4.6-3.2.2-.2 2.7-1.7 2.7-1.7.6-.3 1.1-.7 1.7-1 .6-.4 6.9-5.5 6.9-5.5.4-1 1.7-1.5 2.7-2.1.1-.2.2-.3.4-.4.4-.4.8-.6 1.3-.8.2-.2.4-.2.6-.4l.2-.2c0-.2.1-.3.2-.4 0-.1.1-.2.2-.2.2 0 .2.2.2 0l.2-.2c0-.1.1-.2.2-.2.2-.2.2-.4 0-.4-.2-.1-.3-.2-.4-.4.1-.3.2-.5.4-.6.2-.1.4-.1.6 0 .1.2.2.3.4.4.2 0 .4-.2.4-.4s.1-.3.2-.4c.2-.2-.2-.2-.4-.2s0-.2.2-.2c0-.2-.2-.4-.4-.4s-.4.2-.6.2l-.2.2h-.2v.2c0 .2-.2 0-.2 0h-.8c-.1 0-.2.1-.2.2-.2 0-.2.2-.4.2-.4 0-.9.2-1.3.4-.2.2-.5.4-.8.4h-.6l.1.1-.2.2c0 .3-.3.6-.6.6-.5.2-1.1 0-1.5-.4-1 0-1-.6-1.3-1.3 0-.2-.1-.4-.3-.4h-.2c-.2.1-.3.2-.4.4-.4.6-1.1 1.1-1.9 1.3-.4.1-.7.1-1 .2-.3-.1-.6-.1-.8 0-.2 0-.2.2-.2.4s-.2.2-.2.4c-.2.2-.4.4-.6.2-.2 0-.6-.2-.2-.6.2-.2.6-.2.4-.6 0-.2-.2 0-.4 0-.2.2-.4.2-.6.2-.4.1-.8-.2-.8-.6v-.2l.2-.2.2-.2v-.4c.1-.2.2-.3.4-.4.2-.3.4-.5.6-.6.3.1.6 0 .8-.2.2-.4 0-.6.2-1s.6-.4.2-.8c-.4-.4-.8 0-1.3.2-.2.2-.4.4-.6.4-.4 0-.2-.2 0-.4l.6-.6c.1-.4.5-.6.8-.6.2 0 .5-.1.6-.2.2-.4 0-.6-.4-.6s-.9.2-1.3.4c-.3.2-.6.4-.8.6-.2.3-.6.4-.8.2h-.2c-.3.1-.5.2-.6.4-.4.2-.8.4-1-.2.1-.2.2-.3.4-.4 0 0 1-.2 1.3-.2.4 0 .7-.2 1-.4 0-.1.1-.2.2-.2.4-.4-.2-1.3-.6-.8-.4.3-.8.6-1 1-.2.2-.5.4-.8.4-.2 0-.8-.2-.6-.6.2-.2.4-.3.6-.4l.6-.6 1.3-.6c.2 0 .8 0 .8-.4 0-.2-.2-.2-.4-.2h-.7c-.4 0-.7 0-1-.2-.2-.2 0-.6-.4-.6-.6 0-.2.2-.4.6-.4.3-.8.4-1.3.2-.2-.4.4-.8.6-.8.3-.2.7-.3 1-.2h.4c.2 0 .2-.4.4-.4s.2-.4 0-.4h-.8c-.3.2-.5.4-.6.6-.2.2-.5.4-.8.4-.4 0-.4-.4-.8-.4-.4-.2-.4.4-.4.6-.1.3-.5.5-.8.4l-.6.6c-.6.4-1.4.6-2.1.6-.3 0-.5.2-.6.4-.6.4-1.3-.2-1.9 0l-.4.2c-.2 0-.2-.2-.4-.2-.5 0-1-.1-1.5-.2-.3.1-.5.2-.6.4-.3.4-.8.6-1.3.6-.3-.1-.5-.2-.6-.4-.1-.2-.4-.2-.5-.1l-.1.1c-.1.2-.2.5-.4.6-.2 0-.4 0-.4-.2s.2-.2.2-.4 0-.2-.2-.2l-.4.2h-1c-.2 0-.3-.1-.4-.2-.2 0-.2-.2-.4-.2-.2.1-.3.2-.4.4h-.6c-.2-.1-.4-.1-.6 0l-.4.4h-1c-.8 0-1.7.1-2.5.2-1.3.2-2.3.6-3.6.8s-6.5.4-7.4.4-4.2-.2-4.4.2h-1c-.2-.2-.4-.3-.6-.4-.6-.2-.2.4-1-.2-.7-.3-1.5-.4-2.3-.2-1.5 0-4.2-.4-4.6-.4-.9-.2-1.8-.6-2.5-1.3-.4-.6-1.3-.6-1.3-1.5-.1-1.8.1-3.7.6-5.5.2-.8.4-3.8.6-4s0-.2.2-.4c1-1 .6-1 .8-2.1.4-1.7 1-4.4 2.9-4.8.9-.3 1.9-.6 2.7-1 1.2 0 2.4-.3 3.6-.6.3-.2.5-.3.8-.4 1.3-.2 2.3.2 3.6 0 .9-.1 1.8-.2 2.7-.2.4 0 0-.4.2-.4.6-.2.6.4 1.3.6 1 .2 2 .2 2.9.2.2 0 0-.2.2-.4.4-.4.6.4.8.4.4.4 9.2 1.5 9.9 1.5 1.2.3 2.5.1 3.6-.4 1-.4 1.9-.9 2.7-1.5.1-.2.1-.4 0-.6.5-.5.7-1.2.6-1.9 0-.3 0-.6.2-.8.1-.3.1-.7 0-1-.1-.4.1-.8.4-1 .4-.4.5-1 .2-1.5-.3-.4-.6-.8-1-1-.4-.2 0 0 0-.4-.2-.2-.4-.2-.6-.2-.6 0-1.1-.1-1.7-.2-1.1-.4-2.4-.6-3.6-.6-1.9 0-3.8-.8-5.9-.6-.4 0-1 .2-1.3.2-.4 0 0-.6-1.3-.6-1.1 0-2.1-.2-3.2-.4-.8-.2-3.8 0-4-.2-.2 0-.5-.1-.6-.2-.4-.4-.9-.7-1.5-.8-.2 0-.3-.1-.4-.2-.3.1-.7.1-1 0-.4-.2-1.3-.4-1.3-1-.2-1 1.7-2.3 2.5-2.7.6-.4 1.3-1.3 2.1-1 .4-.1.7-.3 1-.6 1.3-1.8 2.7-3.5 4.2-5 .8-.6.2-1.7 1.5-2.5.4-.5.8-1.1 1-1.7.6-1 .4-2.7 1.5-3.6l.3-.9c.1-.3 0-.6-.2-.8-.1-.3-.1-.7 0-1V100c-.1-.5.2-1 .7-1h.3c.4 0 0-1 0-1.5-.3-1.2-1.3-2.2-2.5-2.3-1.7-.2-2.9 1-4 2.3-.6.8-2.7 3.6-2.9 3.8-.6.4 0 .6-.6 1.5-.2.2-.6.2-.8.4-.3.4-.5.9-.6 1.4.1.3 0 .6-.2.8-.8.6-.8-.2-1.3 0-1.5 1-1.5 1.5-1.7 1.5-.5.6-1.1 1-1.8 1.2-.7 0-1.4.3-1.9.8-.2.4-1.3.4-1.3-.2.1-.9.3-1.7.6-2.5.2-.8-1.3-1.5-.4-2.3.4-.4.4-1 0-1.4-.2-.5-.4-1-.4-1.5-.4-.6.2-.6-.4-1.5-.2-.4-.6.2-.8-.8-.2-.6-.6-1-1.1-1.2-.4-.4-1-.8-1.5-1.3-1.4-1-3-1.7-4.6-2.1-1.7-.4-3.4-.5-5-.2-.4 0-1 0-1-.4 0-.1-.1-.2-.2-.2-.5-.1-1-.1-1.5.2-1 .4 0 .8-.6 1-.8.2-2.7.8-3.4 1-.4.1-.8.2-1.3.2-.6 0-.6.4-1.3.8-1.3.6-1 3.8-1 4.6 0 .2.1.4.3.4h.2c.2 0 .6.2.6 1 0 .6-.1 1.3-.2 1.9-.2.8.2.4.2 1s.8 2.7.6 3.2c0 .2.2.4.2.6 0 .1.1.2.2.2.4 0 .4.8.6 1.5.2.6.4 1.1.8 1.5.2.2.2.4.4.6s.4.4.2.6-.8.8-1 .6c-.4-.2-1.5-.2-1.9-.4-.8-.2-1.7.2-1.9 0-.3-.2-.7-.3-1-.4-.4-.2-.4.2-.6.2-.3-.2-.5-.4-.6-.6-.6-.5-1.3-.8-2.1-.8-1-.3-1.9-.7-2.7-1.3-.8-.6-4-1.7-4-2.1-.2-.4-1-.2-1.3-.4 0-.4-1-.4-1-.6 0-.4-.6-.2-.8-.4-.3-.3-.7-.4-1-.2-.2.2-.6.2-.8 0-.2-.2-.4-.3-.6-.4-.5-.2-1.1 0-1.5.4-.6.4-1.1.9-1.5 1.5-.2.4-.4.6-.6 1-.2.3-.4.6-.6.8-.2.3-.2.7.1.9.1.1.2.1.3.1.4.2 0 .6.4.8.6.2.8 1.5 1.5 2.1.7.8 1.2 1.7 1.5 2.7.4.8 1.7.2 2.1 1 .6.9 1.4 1.7 2.3 2.3 1.1.8 2.3 1.3 3.6 1.7 1.6.1 3 .8 4.2 1.9 1 .2 1.9.9 2.3 1.9.4 1.4.7 2.9.8 4.4.4 2.7 1.5 2.3 1 3.2-.6 1.3.4 2.5.4 5.7-.1 1-.4 1.9-.8 2.7-.6 1.7.4 4 .2 4.6-.4 1-.6 4.8-1.5 5.7-.4.3-1 .3-1.5 0-.8-.4-3.4.2-4-.2-1-1-2.5-.8-3.2-1-.7-.2-1.5-.4-2.1-.8-1-.6-5.7-2.1-7.4-3.2-4.2-2.1-9.9-4.6-10.3-6.9-.2-.8-6.5-5-7.4-6.3-.6-.8-1.7-1.9-1.9-2.3-.2-.4-.4-1.7-.6-2.1-.8-1-1.9-1.3-2.3-3.4-.2-.8-.6-.4-1.7-2.5-2.3-5.7-1.9-12.4-1.9-14.7 0-2.1 1.9-6.7 2.5-8.4.4-1 1.5-1.7 1.9-3.4 0-.6 2.7-2.3 3.8-4 1.1-1.5 2.5-2.7 4-3.8.8-.4 10.5-7.8 11.3-8.6.7-1.1 2-1.9 3.4-1.9.7-.1 1.3-.5 1.7-1 .2-1 10.3-3.6 11.8-5.2.4-.6 3.6-1.5 5-1.7.4 0 .4.4 1.3-.4.8-.6 2.3.4 3.4-.4 1.3-1.3 1.5-1.5 3.8-1.5s2.1-1.3 3.8-1.3c1.3 0 2.5-.6 3.2-1.7.4-.8 4.8-1 5.7-1.7 2.1-1.7 3.6.2 6.3-.4.4 0 1.5.2 2.1.2s1.7-.8 1.9-.2c.2.4 4.2.2 5.2.2.3-.1.5-.2.8-.2-.2.4 2.5.2 2.9.6.9.8 2 1.1 3.2.8 1.6-.1 3.3.1 4.8.6.8.2-.6.6 2.3.8 1.9 0 8 3.8 9.2 4 1.5 0 1.9 1.7 3.6 2.3 2.9 1 6.3 3.6 13.4 9 .4.2.6 1.5 1 1.5 1.9 0 3.6 3.4 4.4 4.4.2.2 1.5-.4 1.3 1.7 0 .4.8-.2 1 1.3 0 1.7 2.9 2.5 3.8 6.1.1.4.3.7.6 1 1.2 3 2.1 6.2 2.5 9.5.2 2.5.2 5.1-.2 7.6-.7 2.6-1.5 5.1-2.5 7.6-.6 1.5-2.1 3.6-2.1 4.2 0 .4-.4 1-.4 1.7.1.4 0 .7-.2 1-.5.2-1 .5-1.3 1 0 .4-.8.4-.8.8 0 .6-1 .4-1 1 0 .4-.8.6-.6 1.3-.2.2-.4.3-.6.4-.5.4-1 1-1.3 1.7-.3.2-.5.5-.6.8-.2.4-.5.8-.8 1-.2.4-.6.4-.6.6-.2.3-.3.7-.2 1 0 .4-.6 1.5.2 1.5.3-.2.5-.4.6-.6.3-.3.6-.6 1-.6.5-.2 1-.5 1.5-.8.2-.4.5-.7.8-.8h.5c.1 0 .2-.1.2-.2.2-.2.4-.6.6-.8.2-.2.4 0 .6-.2 0-.2.1-.3.2-.4.2 0 .4 0 .4-.2.2-.1.3-.2.4-.4.2-.3.5-.4.8-.2.4.2-1 1.5-1 1.7-.4.4-.4.8-.8 1.3l-.8.8c-.2 0-.2.2-.4.2 0 .2-.2.2-.2.4l-.6.6c-.2.2-.2.4-.4.6-.3.3-.4.7-.2 1 0 .2.2.4.4.2s.4-.4.4-.6c.2-.2.2-.4.4-.6.2-.2.4-.2.6-.4.2-.1.3-.2.4-.4.3-.5.6-.9 1-1.3l.6-.6c.2 0 .4 0 .4-.2s0-.4.2-.4.2.2.2.4 0 .2.2.2.4-.2.4-.4c.1-.3.2-.5.4-.6.2-.2.4-.2.6-.4l.8-.8.6-.6c.2-.3.4-.5.6-.6h.4c.2 0 .2 0 .2-.2l.2-.2c.2 0 .2.4.2.6v.4h.4c.2 0 .4 0 .2.2 0 .2-.2.2-.2.4l-.8.8-.4.4c-.4.4-.6.8-1 1.3-.2.4-.6.6-.8 1-.3.4-.6.8-.8 1.3-.2.4-.5.7-.8.8-.2.2-.2.4-.2.6 0 .2-.2.4-.4.4-.4.4-.6.8-.8 1.3 0 .2 0 .6.2.4.1-.2.2-.3.4-.4.2-.2.4-.2.6-.2.3 0 .6-.3.6-.6 0-.2 0-.6.2-.6.2-.2.4 0 .6-.2.2 0 .4-.2.6-.2.2 0 .5-.1.6-.2v-.4c0-.2-.2-.2 0-.2l.2-.2c0-.2-.1-.3-.2-.4-.2-.1-.3-.2-.4-.4 0-.2.1-.3.2-.4.1-.1.2-.3.2-.4v-.2c0-.1.1-.2.2-.2l.2-.2c.2 0 .4.2.6.2h1.3c.2 0 .4 0 .4-.2v-.2c0-.2-.2-.2-.2-.4s0-.4.2-.4c.1-.2.2-.2.4-.2.4 0 .8.6 1.3.4.2 0 .2-.2.2-.4l-.2-.2c0-.1-.1-.2-.2-.2-.1-.3 0-.6.2-.8l.6-.6c.2 0 .2-.2.4-.2s.2.2.2.4 0 .4-.2.4c-.3.2-.4.6-.2.8.2.2.5.3.8.2h.8c.2 0 .2.4.2.4-.1.3-.2.5-.4.6l-.6.6c-.2 0-.3.1-.4.2-.3.1-.5.2-.6.4 0 .2 0 .4.2.4.3 0 .5.2.6.4 0 .5-.4.9-.8 1-.3.1-.5.2-.6.4l-.2.2-.2.4c-.2 0-.3-.1-.4-.2h-.2l-.2.2c-.1 0-.2.1-.2.2v.8c-.1.1-.2.3-.2.4 0 .2.4 0 .4 0 .2 0 .2-.2.2-.4.2-.2.4.2.4.4s-.2.2-.2.4.1.3.2.4c.3 0 .6-.2.8-.4-.1-.2-.1-.4 0-.6.2 0 .3.1.4.2.1.1.3.2.4.2.2-.1.3-.2.4-.4.2-.2.4-.4.6-.4.4-.1.8-.3 1-.6l.6-1.3c0-.2.2-.4.2-.6.4-.4.8-.2 1.3-.6.2-.1.2-.2.2-.4s.2-.2.2-.4c.1-.1.1-.3 0-.4 0-.2.1-.3.2-.4.2-.2.4-.2.4 0 .3.1.6.1.8 0 .1.3 0 .6-.2.8-.6.4-.4 1.3-1 1.9-.2.2-.6.2-.8.4-.2.2-.2.8-.4 1s-.4-.2-.4 0c-.1.1-.2.3-.2.4v.2c0 .2-.4.4-.2.6h.4c.2 0 .3-.1.4-.2l.2-.2.2.2s.2.2.2 0v-.2l.2-.2.2.2c0 .2.4 0 .4 0l.2-.2c.2-.2.4-.4.4-.6l.6-.6c.2 0 .4 0 .4-.2.2 0 .4-.2.4-.4.3-.1.6-.4.8-.6.2-.2.4-.4.4 0v.4c0 .4-.6.4-.6.8v.4c0 .4-.4.2-.6.4-.4.2-.7.6-.8 1v.4c.1.1.2.3.2.4h-.4c-.4 0-.2.4-.2.6s-.4-.2-.4.2c0 .2-.1.5-.2.6-.1.2-.4.4-.6.4h-.2c-.1 0-.2.1-.2.2v.4c0 .1-.1.2-.2.2l-.4.4c0 .1.1.2.2.2h.6c.1 0 .2-.1.2-.2.2 0 .2-.2.4-.2.4-.4.8-.6 1.3-1 .3-.5.6-.9 1-1.3.2-.2.4-.4.6-.4.4-.2.4.4.2.6 0 .2-.1.3-.2.4-.1 0-.2.1-.2.2-.1.1-.2.3-.2.4-.1.3-.4.6-.6.8-.2.2-.4.2-.6.4-.2.2-.2.4-.4.6 0 .2-.2.4.2.4.3 0 .5-.2.6-.4.2-.2.6-.2.8-.4s.2-.4.4-.6c0-.2.2-.4.4-.4.1-.2.2-.3.4-.4 0-.2 0-.2.2-.2s.6-.2.6.2c-.1.3-.2.5-.4.6-.4.4-.8.9-1 1.5-.1.6-.3 1.2-.6 1.7-.2.2-.4.6-.6.8-.2.2-.4.2-.6.4l-.6.6c-.2.4-.6.7-1 .8l-.4.4-.6.6c-.2.2-.2.4-.4.6-.2.2-.4.4-.4.6h-.4l-.2.2c0 .2-.2.2-.2.4-.1.1-.2.3-.2.4.2.4 1.3-.6 1.3-.6l1-1 2.7-2.7c.8-.8 1.5-1.6 2.1-2.5.2-.4.6-.8.8-1.3.1-.4.3-.7.6-1 .2-.2.6 0 .8-.2 1-.4 1.7-1.9 2.3-2.7 1.8-2.6 3.4-5.4 4.6-8.4.2-.4.2-1.5 1.3-1.7.6-.2.4-1.7.6-2.1.1-.8.3-1.6.8-2.3.7-1.1 1-2.3 1-3.6.2-1.3 2.7-9.9 2.1-16.6-.2-1.3-.2-9.2-2.3-11.8-1.5-1.5.2-3.6-.6-5.9-.2-.6.6-.8.8-1.5.6-1.5-.2-3.2-1.7-3.8-.8-.2-2.1-.2-2.5-1.3-.2-.4.6-2.3-.4-4.2-.4-.8-1.3-3.2-7.6-8-1.9-1.8-3.7-3.6-5.4-5.6-1.4-1.7-2.9-3.2-4.6-4.6-.6-.4-1.5-2.3-4.2-3.4-.8-.4-6.9-5.2-7.6-5.5-2.5-.8-6.9-4-7.8-4.2-4.6-1-6.1-3.6-7.8-3.8-1.3-.2-4.8-.4-6.7-2.5-1-1.1-2.7-1.4-4-.6-.8.4-3.8-2.1-8-1.5-.8.2-1.7-1.5-4.8-1-2.9.4-5-1.7-6.1-1.9-1-.4-7.4-2.1-10.3-1.9h-1.7c-5.8-.8-11.7-.8-17.4 0-1.5.4-19.3 5-21 5.9-1.5.8-5.2 2.1-6.1 2.5-1.9.8-9.5 3.4-9.9 4.2-.2.4-1.3.4-1.7.8-1.3 1.4-2.9 2.5-4.6 3.2-1.5.6-9 6.1-10.5 7.1-.4.2-5 3.4-5.6 3.7m171.6 22.1c0 .6-.2 1.2-.6 1.7h-.4c-.3-.1-.5-.2-.6-.4-.1-.1-.2-.3-.2-.4-.2-.1-.2-.2-.2-.4s-.1-.3-.2-.4c0-.2.1-.3.2-.4 0-.2.2-.2.2-.4.1-.1.3-.2.4-.2.6-.3 1.3.2 1.4.9m-44.9 55c-.1.4-.3.7-.6.8-.2.2-.2.8-.6.4.2-.5.4-.9.8-1.3.2.1.4-.1.4.1m1.8.9c0 .2-.2.2-.2.4-.3.2-.5.5-.6.8l-.2.2c-.4.6-.9 1.1-1.5 1.5-.2.2-.6.4-.8.6-.2 0-.6.6-.8.4-.1-.2-.1-.4 0-.6.1-.2.2-.3.4-.4.2-.2.2-.4.2-.6.1-.3.2-.5.4-.6.2-.2.5-.2.8-.2.4 0 .4-.2.6-.6 0-.1.1-.2.2-.2 0-.2 0-.2.2-.2s.2-.2.4-.2c.2-.2.4-.4.6-.4.2-.2.3-.1.3.1m20.4 2.3v.4c0 .2-.2.2-.4.2s-.4.2-.6.2c-.2 0-.4.2-.6.2 0 0-.6.2-.4.2.2.2 0 .2-.2.4-.2.1-.4.1-.6 0 0-.3 0-.6.2-.8.2-.2.4-.2.6-.4.2-.2.4-.2.6-.4.2-.2.4-.4.6-.4.3.1.6.2.8.4m-13.2.6c-.2 0-.4.2-.4 0-.2-.2.2-.4.4-.4s.2.4 0 .4m.4.4c0 .2-.2.2 0 0-.2.1-.5.2-.6.4-.2.2-.4.2-.6.4 0 .2-.2.4-.4.4s-.4 0-.4-.2.2-.4.4-.4.4 0 .4-.2c.1-.1.2-.3.2-.4h1m-13.2 2.8c-.6.6-1.7 1.5-2.3.8-.6-.6-.2-1 .2-1.7.8-.6 2.3-1.5 2.7-1 .4.6-.4 1.5-.6 1.9m22.2-.3c-.2 0-.2-.4-.2-.4v-.4c0-.2.4 0 .4 0 .2 0 .2 0 .2.2s-.2.2-.2.4c0-.2 0 0-.2.2m-12.6 0c-.3-.2-.4-.6-.2-.8 0-.2.2 0 .2 0 .2.2.2.4 0 .4.3.2.3.4 0 .4m-.8.9c0-.2.2-.2.2-.4l.2-.2c0-.2-.2-.2-.4-.2s-.3.1-.4.2c-.3.2-.7.3-1 .4h-.6c-.2 0-.4 0-.4.2v.4c.2.3.6.5 1 .4.2 0 .6-.2.8-.2l.6-.6m17.9 0c.2.2 0 .2 0 .2l-.2.2c0 .1-.1.2-.2.2-.2 0-.2-.2-.2-.4s.2-.2.4-.2h.2m-20.8 1.9c-.2 0-.4-.2-.4-.4.2-.2.6-.2.6 0 .2.2 0 .4-.2.4m-11.4 3.1c-.2.1-.4.1-.6-.1l-.1-.1c0-.2.1-.3.2-.4.2-.2.4-.4.6-.4.2-.2.4-.2.2.2-.1.2-.2.3-.4.4l.1.4m30.1 1.9c.2 0 0 .8-.2.8-.5.1-.1-.8.2-.8m-2.4.7c.1.6-.1 1.2-.6 1.5-.2.2-.5.3-.8.2-.3-.1-.5-.2-.6-.4-.1-.5.2-1 .6-1.3.2-.2.4-.2.6-.2.4 0 .8 0 .8.2m-1.6 2.5l-.2.2c-.1 0-.2.1-.2.2h-.4v-.2l.2-.2c.1-.1.3-.1.4 0 0-.2 0 0 .2 0m-53.8-90.6c-.1.5-.3 1-.6 1.5-.2.2-.2.4-.4.6s-.4.2-.6.4c-.3.2-.7.2-1 0-.4-.4 0-.8 0-1.3-.2-.7 0-1.4.4-1.9.3-.5.6-1 1-1.5.2-.3.6-.4.8-.2.6.5.4 1.6.4 2.4m-8.8 3.2c.1.5.3 1 .6 1.5.4.4.5 1 .2 1.5-.6 0-.4.4-.6.4-.4 0-1.9 0-2.3-1-.2-.3-.2-.7-.2-1 .1-.8.1-1.5 0-2.3 0-.6.8-.6 1.3-.4.3.3.7.8 1 1.3m17.8 1c-.2.6-1.3.8-.8 1.7.2.4-.4.6-.6.6-.8.2-1.7 1-2.5.6-.4-.6-1.5-.8-1.5-1.7.4-.8 1.3-.6 1.7-1.3.3.1 3.3-.5 3.7.1zm-21 5.9c0 .4-.1.7-.2 1-.4.3-1 .5-1.5.4-.6.1-1.1.1-1.7 0-.5-.1-.9-.3-1.3-.6-.2-.4-.2-.8-.2-1.3.2-.4.6-.6 1-.6.5-.1 1-.1 1.5 0 .7.2 1.4.3 2.1.4.3.1.3.5.3.7m16.2 4.4c-1.4 2.6-3.9 4.5-6.7 5.2-1.5.2-3.2.8-4.4-.2-.4-.4-.8-.6-1.3-.8-.5 0-.9-.2-1.3-.4-.2-.4-.3-.8-.2-1.3 0-.2-.2-.6-.2-.8-.3-.4-.6-.9-.6-1.5-.1-.7 0-1.5.4-2.1.2-.2.8-1.5.2-1.5-.2 0-.2-.6.2-1 .6-.4.8-2.5 2.9-3.2 1.5-.4 2.5-2.3 4.2-2.3.8-.1 1.6-.1 2.3.2.7.1 1.4.5 1.9 1 .2.4 1.5 1 1.9 1.9.5.5.9 1.1 1.3 1.7 0 .4.4 1.5.4 1.9-.6.7-.8 2.8-1 3.2m-4-4.2c-.3-.5-.7-.9-1.3-1-.5-.2-1-.2-1.5-.2-1-.4-1.7.6-2.5.8-.4.1-.7.3-.8.6-.8.6-1.5 2.7-1.7 3.2-.2.8.2 1.6 1 1.8.1 0 .2.1.3.1.7 0 1.4 0 2.1-.2 1-.4 1.9-1 2.5-1.8.5-.6.9-1.2 1.3-1.9.8-.9.6-1.3.6-1.4m9.8 4.4c.3 0 .6.3.6.6 0 .4-.4.2-.6.2-.4.2-.2.8-.8.8-.2 0-.6.2-.8.2-.7 0-1.4 0-2.1-.2-.2-.1-.3-.2-.4-.4-.4-.1-.6-.5-.6-.8 0-.2 0-.2-.2-.2-.2-.2 0-.6.4-.8h.6c.6-.2 1.3-.2 1.9 0 .3 0 .6 0 .8.2.4.2.8.3 1.2.4m-22.4 4l.2.2c.2.4-.2.6-.4.8-.2.2-.6.4-.8.6-.3.2-.7.4-1 .4H129c-.5 0-.8-.4-.8-.8.2-1.5 2.1-1.7 3.2-2.3.5-.1 1 .2 1 .7-.1.2-.1.3-.1.4m14.7 2.3c.3.3.6.6.8 1 .2.4.2.8.4 1.3.2.6-.6.6-.8 1 0 .1-.1.2-.2.2-.3 0-.6 0-.8-.2-.3 0-.7-.1-.8-.4-.2-.2-.3-.5-.2-.8 0-.4-.1-.7-.2-1 0-.2-.2-.2-.2-.4v-.4c-.2-.4.2-.4.2-.8 0-.2 0-.4.2-.4.3 0 .6 0 .8.2.1.8.6.8.8.7m-7.6 1.5c.4.6.4 1.3 0 1.9-.2.4-.6 1-.8 1.5-.2.2-.2.4-.4.6-.4.1-.8 0-1-.4 0-.2-.1-.3-.2-.4 0-1.5 1-3.6 1.7-3.6.1-.2.5.2.7.4m46.5 71.6c-.4.2 0 1-.2 1.5-.2.3-.6.5-1 .4-.4-.2-.2-.4-.2-.8v-.4c.1-.1.1-.3 0-.4-.1 0-.2-.1-.2-.2v-.6h.2c.2 0 .3.1.4.2h.6c.1 0 .2-.1.2-.2.2 0 .4 0 .4.2 0-.1 0 .3-.2.3l-.2-.2c.4.2.2.2.2.2m-10.1-7.9c-.2 0-.2.2-.4.2s-.2-.2 0-.4v-.4c.2-.4.8 0 .8-.4 0-.2.4-.8.6-.6 0 .3 0 .6-.2.8 0 .2-.1.3-.2.4-.2.1-.3.2-.4.4h-.2m9.4-14.1l-.2.2c0 .1.1.2.2.2 0 0 .4-.2.2-.4.1-.2-.2 0-.2 0m9.9 2.7c0-.2-.8 0-.6.2-.2.2.6 0 .6-.2m1.1-3.3c-.2 0-.2-.4-.4 0 0 .2-.2.4 0 .4.2.2.6.2.6 0 .2-.2.4-.4.2-.4h-.4m-4.5-1.3c-.2.1-.5.2-.6.4-.4.4-.8.8-1 1.3l-.6.6s-.2.2 0 .2.5-.1.6-.2c.2 0 .2-.2.4-.2s.2-.2.4-.2l.2-.2.2-.2.2-.2c.2-.2.2-.4.4-.6.2-.3.1-.6-.2-.7.1 0 0 0 0 0m7.6-.2h-.4c-.4 0-.4-.2-.6.2-.1.3-.1.7 0 1 .3-.1.5-.3.6-.6.4 0 .8-.6.4-.6m1.3 2.5c.2 0-.2.4-.4.6-.3.1-.6.2-.8.2 0 0-.4.2-.4 0v-.4c0-.2.2-.2.4-.2s.2-.2.4-.2c.2-.1.5-.1.8 0m-13.9 1.5c.4 0 .2.4 0 .4l-.4.4c-.6.4 0-.6.4-.8m-1.5 1.4c-.2-.2-.6.4-.8.6-.2.2-.8.4-.4.8.3.1.7 0 .8-.3v-.1c.3-.2.5-.5.4-1m12.4.5c0 .1-.1.2-.2.2v.2c0 .1.1.2.2.2h.2c.2 0 .2-.2.2-.4-.1 0-.3-.1-.4-.2.3 0 0-.2 0 0m0 1.2c-.8-.1-1.5.1-2.1.6-.4.4 0 1 .6 1.3.4 0 .7 0 1-.2.2-.2.2-.6.4-.8.2-.1.5-.2.6-.4.1-.3-.2-.5-.5-.5m9.3 3c-.6.2-1 .7-1 1.3.1-.1 1.4-1.5 1-1.3m-11.2-.9c-.2 0-.8-.4-.8 0 0 .7.8.4.8 0m-28.1 7.2c-.3-.1-.6 0-.8.2-.2 0-.2.2-.4.2h-.4c-.2.2 0 .2.2.2h.4c.3.1.7-.1.8-.4.2 0 .4 0 .2-.2m-3 1.2c-.2.1-.4.2-.6.2-.2 0-.2 0-.2.2-.1.1-.1.3 0 .4h.8c.3-.2.3-.5 0-.8m12.7-1.7c-.2.1-.3.2-.4.4l-.2.2c.2.2.2 0 .4 0s.3-.1.4-.2c.2 0 .2-.2.4-.2.3-.2.5-.4.6-.6 0-.4-.6 0-.6 0-.2.2-.4.2-.6.4m.4 2.6c.2.3.4.5.6.6.2 0 .8.2.8-.2-.1-.1-.2-.3-.2-.4 0-.2-.2-.2-.4-.2h-.4c-.2-.2-.4-.3-.6-.4 0 .1.1.4.2.6m1.4-.7c0 .2.1.3.2.4.6.4.4-.2.6-.6 0-.2.4-.4.4-.6.1-.4-1.2.2-1.2.8m1.3 1.3c.2 0 .2-.2.4-.2.2-.2.4-.2.6-.4 0 0 .2-.4 0-.4-.3.2-.5.4-.6.6-.5.2-.9.5-1.3.8 0 .2.2.2.4.2s.2 0 .2-.2c.1-.4.3-.4.3-.4m.4.2c-.3.1-.6.3-.8.4l-.2.2c0 .1.1.2.2.2.1.2.2.2.4.2.1 0 .2-.1.2-.2v-.2l.2-.2c.1-.1.1-.3 0-.4m-.8 1.1c-.2 0-.2.2 0 0-.2 0-.4 0-.4.2-.2 0-.4.2-.2.4h.6l.2-.2c-.2 0-.2 0-.2-.4m8 3.7c-.2 0-.4 0-.4.2s-.2.4 0 .4c.6-.2 1.2-.4 1.7-.8-.5-.1-1 0-1.3.2m-9.5-.4c-.3.2-.5.5-.6.8 0 .4.4.4.8.4.9.3 1.8.1 2.5-.4.3-.4.4-.8.2-1.3-.2-.4-.6 0-1 0-.6.1-1.2-.3-1.9.5m13.9-1.2c0 .4.2.4.2.4.3.1.6.2.8.4.1.2.2.3.4.4.2 0 .4-.2.4-.4v-.4c0-.2.2-.2 0-.2-.1-.2-.4-.4-.6-.4h-.6c-.2 0-.3.1-.4.2.2 0 0-.3-.2 0"
      />
    </svg>
  </div>
);
export default FooterContainer;
