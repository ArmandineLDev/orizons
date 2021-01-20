import React, { useState } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './subscribe.scss';

const Subscribe = () => {
  const [nickname, setNickname] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  // Hook qui vient de React Hook Form
  // https://react-hook-form.com/get-started
  const {
    register, handleSubmit, errors,
  } = useForm({
    // valeurs par défaut pour éviter de remplir à chaque fois...
    defaultValues: {
      nickname: 'Kamilou',
      lastname: 'Duvert',
      firstname: 'Kamil',
      email: 'iamkamil@email.com',
      password: 'P@ssw0rd',
      passwordRepeat: 'P@ssw0rd',
    },
  });
  // on cherche à voir si le serveur a bien reçu les infos
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <h1 className="text-center p-4 font-weight-bold">Inscris-toi pour créer ton premier carnet !</h1>
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="form"
          onSubmit={handleSubmit((formData) => {
            // on récupère un objet avec toutes les données. Envoyées seulement si correctes
            setSubmitting(true);
            // eslint-disable-next-line no-console
            console.log('formData', formData);
            // TODO: requête AXIOS pour envoyer les infos au serveur

            setSubmitting(false);
          })}
        >
          <Form.Group size="lg" controlId="nickname">
            <Form.Label>Pseudonyme</Form.Label>
            <Form.Control
              autoFocus
              name="nickname"
              type="text"
              defaultValue={nickname}
              onChange={(e) => setNickname(e.target.value)}
              // on attache notre input au React Hook Form pour les critères de validation
              ref={register({
                // si le champ n'est pas rempli lors de la soumission, le champ se met en focus
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.nickname && <div className="text-danger">{errors.nickname.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="lastname">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              autoFocus
              name="lastname"
              type="text"
              defaultValue={lastname}
              onChange={(e) => setLastname(e.target.value)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.lastname && <div className="text-danger">{errors.lastname.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="firstname">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              autoFocus
              name="firstname"
              type="text"
              defaultValue={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.firstname && <div className="text-danger">{errors.firstname.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              autoFocus
              name="email"
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              autoFocus
              name="password"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
                minLength: {
                  value: 8,
                  message: 'Le champ doit contenir au moins 8 caractères',
                },
                validate: (value) => (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) || 'Le champ doit contenir au moins une majuscule, minuscule et un caractère spécial'
                ),
              })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="password-repeat">
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              autoFocus
              name="passwordRepeat"
              type="password"
              defaultValue={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
                validate: (value) => value === password || 'Veuillez entrer le même mot de passe',
              })}
            />
            {errors.passwordRepeat && <div className="text-danger">{errors.passwordRepeat.message}</div>}
          </Form.Group>
          {/* A la soumission du form, en attente de la réponse serveur le bouton est désactivé */}
          <Button block size="lg" className="mt-3" type="submit" disabled={submitting}>
            Valider
          </Button>
        </Form>
      </Container>
      <p className="text-center m-3">Vous êtes déjà inscrit ? <Link to="/connexion">Connectez-vous !</Link></p>
    </>
  );
};

export default Subscribe;
