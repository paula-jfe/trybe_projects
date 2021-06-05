import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FlexContainer from '../components/FlexContainer';
import ButtonLarge from '../components/ButtonLarge';
import allActions from '../actions';

function Explore() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar'));
  }, [dispatch]);

  const history = useHistory();

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/explorar/${url}`);
  }

  return (
    <div>
      <Header />
      <FlexContainer>
        <ButtonLarge
          data-testid="explore-food"
          onClick={ (e) => handleClick(e, 'comidas') }
        >
          Explorar Comidas
        </ButtonLarge>
        <ButtonLarge
          data-testid="explore-drinks"
          onClick={ (e) => handleClick(e, 'bebidas') }
        >
          Explorar Bebidas
        </ButtonLarge>
      </FlexContainer>
      <Footer />
    </div>
  );
}

export default Explore;
