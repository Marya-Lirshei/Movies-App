const apiKey = "8a5ec3319366a9a581bce32a752fa3b4";
const apiUrl = "https://api.themoviedb.org/3";

export const getLocalGuestSessionToken = () => localStorage.getItem("token");

export const setLocalGuestSessionToken = (token) => {
  localStorage.setItem("token", token);
};
export const setLocalRating = (id, value) => {
  localStorage.setItem(id, value);
};

export const getLocalRating = (id) => +localStorage.getItem(id);

export const getGuestSession = async () => {
  const data = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8a5ec3319366a9a581bce32a752fa3b4"
  );
  const res = await data.json();
  setLocalGuestSessionToken(res.guest_session_id); // Сохраняем токен в localStorage
  return res;
};

const session = await getGuestSession();
console.log("New guest session token:", session.guest_session_id);

// export const postMovieRating = async (movieId, rating) => {
//   const token = localStorage.getItem("token");
//   const data = await fetch(
//     `${apiUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${token}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify({
//         value: rating,
//       }),
//     }
//   );
//   const res = await data.json();
//   return res;
// };

// export const deleteRating = async (movieId) => {
//   const token = localStorage.getItem("token");
//   const data = await fetch(
//     `${apiUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${token}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//     }
//   );
//   return data;
// };

export const postMovieRating = async (movieId, rating) => {
  const token = getLocalGuestSessionToken(); // Используем функцию для получения токена
  if (!token) {
    throw new Error("Guest session token is not available");
  }
  const data = await fetch(
    `${apiUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value: rating,
      }),
    }
  );
  const res = await data.json();
  return res;
};

export const deleteRating = async (movieId) => {
  const token = getLocalGuestSessionToken(); // Используем функцию для получения токена
  if (!token) {
    throw new Error("Guest session token is not available");
  }
  const data = await fetch(
    `${apiUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${token}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  );
  return data;
};

export const getRatedMovies = async (page = 1) => {
  const token = getLocalGuestSessionToken(); // Используем функцию для получения токена
  if (!token) {
    throw new Error("Guest session token is not available");
  }
  const data = await fetch(
    `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=8a5ec3319366a9a581bce32a752fa3b4&page=${page}`
  );
  const result = await data.json();
  return result;
};
