import React from 'react'
import Header from './Header'
import {Global, css} from '@emotion/react'
import Head from 'next/head'

export default function Layout(props) {
	return (
		<>
			<Global
				styles={css` 
					:root {
						--gris: #3D3D3D;
						--gris2: #6F6F6F;
						--gris3: #e1e1e1;
						--orange: #DA552F;
						--blue: #3895D3; 
					}
						html {
							font-size: 62.5%;
							box-sizing: border-box;
						}
						*, *:before, *:after {
							box-sizing: inherif;
						}

						body {
							font-size: 1.6rem; /*16px*/
							line-height: 1.5;
							font-family: 'Source Sans Pro', sans-serif;
						}
						h1, h2, h3 {
							margin: 0 0 0 2rem 0;
							line-height: 1.5;
						}
						h1, h2 {
							font-family:'Kiwi Maru', serif;
							font-weight: 600;
						}
						h3 {
							font-family: 'Source Sans Pro', sans-serif;
						}
						ul{
							list-style: none;
							margin: 0;
							padding: 0;
						}
						a{
							text-decoration: none;
						}
			  `}
			/>

			<Head>
				<title>Pets Hunt Next.js & Firebase</title>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossOrigin="anonymous" />

				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@400;500&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet" />

				<link href="/static/css/app.css" rel="stylesheet" />

			</Head>
			<Header />
			<main>
				{props.children}
			</main>
		</>
	)
}


