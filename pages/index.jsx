import Head from "next/head";
import { Link } from "../components";
import { Form, Button, Container, Card } from "react-bootstrap";

export default Home;

function Home() {
  return (
    <div id="containter">
      

      <Card id="card" className="d-flex justify-content-center">
        <Card.Title className="mb-4 ml-4"><h1>Bienvenue dans l'espace d'administration de ressources citoyrenne</h1></Card.Title>
        <Card.Body>
        <Form>
            
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control type="email" placeholder="Entrer email" />
            <Form.Text className="text-muted">
              Ne partager jamais vos accès
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Entrer mot de passe" />
          </Form.Group>
          

          <Button variant="success" type="submit">
            Connexion
          </Button>
        </Form>
        </Card.Body>
        
      </Card>
    </div>
  );
}
