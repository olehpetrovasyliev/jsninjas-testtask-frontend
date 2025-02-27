import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharactersThunk } from "../../helpers/redux/characters/charactersOperations";
import { AppDispatch } from "../../helpers/redux/store";
import {
  selectAllCharacters,
  selectCharactersPage,
  selectCharactersPerPage,
  selectCharactersTotalPages,
  selectLoading,
} from "../../helpers/redux/characters/charactersSelectors";
import CharactersList from "../../components/CharactersList/CharactersList";
import AddCharacterLink from "../../components/AddCharacterLink/AddCharacterLink";
import { setPage } from "../../helpers/redux/characters/charactersSlice";
import styles from "./AllCharacters.module.scss";

const AllCharactersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const charactersArr = useSelector(selectAllCharacters);
  const page = useSelector(selectCharactersPage);
  const perPage = useSelector(selectCharactersPerPage);
  const totalPages = useSelector(selectCharactersTotalPages);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getAllCharactersThunk({ page, perPage }));
  }, [dispatch, page, perPage]);

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };
  const handlePrevPage = () => {
    dispatch(setPage(page - 1));
  };
  return (
    <section className={styles.charactersSection}>
      {isLoading ? (
        <h2>loading</h2>
      ) : (
        <CharactersList charactersArray={charactersArr} />
      )}

      <AddCharacterLink className={styles.charactersSection__addCharacter} />
      <div className={styles.charactersSection__pagination}>
        <button onClick={handlePrevPage} disabled={page <= 1}>
          Prev Page
        </button>

        <button onClick={handleNextPage} disabled={page >= totalPages}>
          Next Page
        </button>
      </div>
    </section>
  );
};

export default AllCharactersPage;
