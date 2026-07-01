--
-- PostgreSQL database dump
--

\restrict tyZcpQsjSoGYWZulOzYD47HqGI7dz54V5k9wYe5zehtGnIHXHylV7JdabdOD0DJ

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

-- Started on 2026-07-01 12:39:59

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
-- TOC entry 216 (class 1259 OID 131095)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id integer NOT NULL,
    question text,
    response text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 131094)
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chats_id_seq OWNER TO postgres;

--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 215
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- TOC entry 218 (class 1259 OID 131105)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description text,
    category character varying(50),
    event_date date
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 131104)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 217
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 220 (class 1259 OID 131114)
-- Name: volunteers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.volunteers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20),
    skills text,
    interests text,
    availability character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.volunteers OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 131113)
-- Name: volunteers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.volunteers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.volunteers_id_seq OWNER TO postgres;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 219
-- Name: volunteers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.volunteers_id_seq OWNED BY public.volunteers.id;


--
-- TOC entry 4745 (class 2604 OID 131098)
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- TOC entry 4747 (class 2604 OID 131108)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 131117)
-- Name: volunteers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteers ALTER COLUMN id SET DEFAULT nextval('public.volunteers_id_seq'::regclass);


--
-- TOC entry 4902 (class 0 OID 131095)
-- Dependencies: 216
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, question, response, created_at) FROM stdin;
\.


--
-- TOC entry 4904 (class 0 OID 131105)
-- Dependencies: 218
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, description, category, event_date) FROM stdin;
\.


--
-- TOC entry 4906 (class 0 OID 131114)
-- Dependencies: 220
-- Data for Name: volunteers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.volunteers (id, name, email, phone, skills, interests, availability, created_at) FROM stdin;
1	Tulya	tulya@gmail.com	9876543210	Teaching, Public Speaking	Education	Weekends	2026-06-15 23:37:41.488445
2	jnanesswar satya patcha	satya@gmail.com	9876543213	python, flirting, dobbadam, communication	girls	123	2026-06-16 00:04:19.520948
3	abd	abd@gmail.com	9876543213	kje	rr	rr	2026-06-16 10:06:17.619509
4	hemant anumula	hemant@gmail.com	9876543213	commnicatisdxgs	\N	evenings	2026-06-17 01:12:40.452544
5	Tulya Jyothi	tulyajyothiveerla007@gmail.com	2345678902	defg	qwef	occasional	2026-07-01 10:13:41.915885
\.


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 215
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chats_id_seq', 1, false);


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 217
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 219
-- Name: volunteers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.volunteers_id_seq', 5, true);


--
-- TOC entry 4751 (class 2606 OID 131103)
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- TOC entry 4753 (class 2606 OID 131112)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4755 (class 2606 OID 131124)
-- Name: volunteers volunteers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteers
    ADD CONSTRAINT volunteers_email_key UNIQUE (email);


--
-- TOC entry 4757 (class 2606 OID 131122)
-- Name: volunteers volunteers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteers
    ADD CONSTRAINT volunteers_pkey PRIMARY KEY (id);


-- Completed on 2026-07-01 12:40:00

--
-- PostgreSQL database dump complete
--

\unrestrict tyZcpQsjSoGYWZulOzYD47HqGI7dz54V5k9wYe5zehtGnIHXHylV7JdabdOD0DJ

