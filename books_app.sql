--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: books; Type: TABLE; Schema: public; Owner: katherinesmith
--

CREATE TABLE public.books (
    id integer NOT NULL,
    author character varying(255),
    title character varying(255),
    isbn character varying(255),
    image_url text,
    description text
);


ALTER TABLE public.books OWNER TO katherinesmith;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: katherinesmith
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO katherinesmith;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: katherinesmith
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: katherinesmith
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: katherinesmith
--

COPY public.books (id, author, title, isbn, image_url, description) FROM stdin;
1	Kurt Vonnegut	Slaughterhouse-five	9780385333849	http://books.google.com/books/content?id=pWyLDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	Billy Pilgrim returns home from the Second World War only to be kidnapped by aliens from the planet Tralfamadore, who teach him that time is an eternal present
2	Aldous Huxley	Brave New World	9780795311253	http://books.google.com/books/content?id=niDNtZoYsAUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	Huxley’’s bleak future prophesized in Brave New World was a capitalist civilization which had been reconstituted through scientific and psychological engineering, a world in which people are genetically designed to be passive and useful to the ruling class. Satirical and disturbing, Brave New World is set some 600 years ahead, in "this year of stability, A.F. 632"--the A.F. standing for After Ford, meaning the godlike Henry Ford. "Community, Identity, Stability," is the motto. Reproduction is controlled through genetic engineering, and people are bred into a rigid class system. As they mature, they are conditioned to be happy with the roles that society has created for them. The rest of their lives are devoted to the pursuit of pleasure through sex, recreational sports, the getting and having of material possessions, and taking a drug called Soma. Concepts such as family, freedom, love, and culture are considered grotesque. Against this backdrop, a young man known as John the Savage is brought to London from the remote desert of New Mexico. What he sees in the new civilization a "brave new world" (quoting Shakespeare’’s The Tempest). However, ultimately, John challenges the basic premise of this society in an act that threatens and fascinates its citizens. Huxley uses his entire prowess to throw the idea of utopia into reverse, presenting us what is known as the "dystopian" novel. When Brave New World was written (1931), neither Hitler nor Stalin had risen to power. Huxley saw the enduring threat to society from the dark side of scientific and social progress, and mankind’’s increasing appetite for simple amusement. Brave New World is a work that indicts the idea of progress for progress sake and is backed up with force and reason.
3	Kobo Abe	The Woman in the Dunes	9780307813732	http://books.google.com/books/content?id=Ife2d7K-SbQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	The Woman in the Dunes, by celebrated writer and thinker Kobo Abe, combines the essence of myth, suspense and the existential novel. After missing the last bus home following a day trip to the seashore, an amateur entomologist is offered lodging for the night at the bottom of a vast sand pit. But when he attempts to leave the next morning, he quickly discovers that the locals have other plans. Held captive with seemingly no chance of escape, he is tasked with shoveling back the ever-advancing sand dunes that threaten to destroy the village. His only companion is an odd young woman. Together their fates become intertwined as they work side by side at this Sisyphean task.
4	George Orwell	1984	9780547249643	http://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	George Orwell’’s 1984 takes on new life with extraordinary relevance and renewed popularity. “Orwell saw, to his credit, that the act of falsifying reality is only secondarily a way of changing perceptions. It is, above all, a way of asserting power.”—The New Yorker In 1984, London is a grim city in the totalitarian state of Oceania where Big Brother is always watching you and the Thought Police can practically read your mind. Winston Smith is a man in grave danger for the simple reason that his memory still functions. Drawn into a forbidden love affair, Winston finds the courage to join a secret revolutionary organization called The Brotherhood, dedicated to the destruction of the Party. Together with his beloved Julia, he hazards his life in a deadly match against the powers that be. Lionel Trilling said of Orwell’’s masterpiece, “1984 is a profound, terrifying, and wholly fascinating book. It is a fantasy of the political future, and like any such fantasy, serves its author as a magnifying device for an examination of the present.” Though the year 1984 now exists in the past, Orwell’s novel remains an urgent call for the individual willing to speak truth to power.
5	John Fante	Ask the Dust	9780062013002	http://books.google.com/books/content?id=-o5G5KDewlcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	Ask the Dust is a virtuoso performance by an influential master of the twentieth-century American novel. It is the story of Arturo Bandini, a young writer in 1930s Los Angeles who falls hard for the elusive, mocking, unstable Camilla Lopez, a Mexican waitress. Struggling to survive, he perseveres until, at last, his first novel is published. But the bright light of success is extinguished when Camilla has a nervous breakdown and disappears . . . and Bandini forever rejects the writer’’s life he fought so hard to attain.
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: katherinesmith
--

SELECT pg_catalog.setval('public.books_id_seq', 5, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: katherinesmith
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

