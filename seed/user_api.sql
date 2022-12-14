--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    location character varying(50) NOT NULL,
    username character varying(20) NOT NULL,
    password text NOT NULL,
    date_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    isadmin boolean DEFAULT false
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, first_name, last_name, location, username, password, date_created, isadmin) FROM stdin;
44	Jerel	Thomas	Dubai	mrProgrammer	$2a$10$IvhdjjDuJ5bpAm/efGzFGO29sm/bc2LgFuUOQTaUYDmArkH2VeQny	2022-08-14 05:40:01.101089	f
32	Dianna	Prince	Canada	islandgirl	1	2022-07-08 18:51:25.393868	f
30	Kadeem	Best	TnT	drfete	1	2022-07-08 18:50:54.518096	f
31	Jon	Snow	TnT	gotboy	1	2022-07-08 18:51:12.916945	f
35	Test	Test	TnT	Test	1	2022-07-16 06:52:11.617252	f
40	Bruce	Wayne	TnT	batman	$2a$10$fkgF6pzBqRES15G0N/z2FuD6vcG18rcicnewtKrSQ3H6NjVhrebLi	2022-07-16 08:54:00.196364	f
41	Clarke	Kent	USA	superman	$2a$10$MvJrcPyvG5HhEkwLyx46j.b7Aj5X7mCda/KlLX2JWHXV4/WKVobwK	2022-07-16 08:54:46.383438	f
53	Peter	Parker	Tnt	spidey2005	$2a$10$Jxfh0WrjXxFO69Leaow/..jV5sOKyJAJO/TWPvq69uM87wCdo8d.O	2022-08-27 08:33:33.460702	f
48	Peter	Rayna	Dubai	spidey	$2a$10$SaqWNfIn..dGcRi97nZ3L.kt8kdIbnlp1yF5EJoYMToChLpRyYIji	2022-08-14 06:06:10.24501	f
54	Peter	Parker	Tnt	spidey2022	$2a$10$lqJR1G2d2wcwlf00wTXl6OUza6spEF0aUBi8HnjtckSOVsMtZoil6	2022-08-27 08:35:40.954202	f
55	Peter	Parker	Tnt	spiderman205	$2a$10$rGMMjpsKePvPVUXQsMHvHe7/I/1PoFxIqMNvvXIyDORQye/OUQlOe	2022-08-27 09:13:26.738531	f
59	Kadeem	Best	Tnt	kbest2022	$2a$10$hth.HquMwSfctd3qCqcLiOnQWfhqdmwv9CaBNF5yO6Lhy5KrLB2e.	2022-08-27 10:02:58.745231	t
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 64, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

