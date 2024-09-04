import React from "react";

import SearchPanel from "../SearchPanel/search-panel";
import MoviesList from "../MoviesList/movies-list";

import "./App.css";

function App() {
  const mockData = [
    {
      id: 1,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/d1ed/f372/ad16f84b4351c548ad40efff6081bd5e?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVWRNClnWgWhxQZPyPFj9KiFQZj82nGIex1hUyVlVocClnnur-JCWghK4VIiwtlX7sZc5KtHe82k0cJEPcQ5abbJsgbzY7pzC68ZNlJTRTMLy-gKcn12GtVuKH-NrtpKDHveIIV6K~es~dBu4IeB1sHcXomHQ9JW6GWREEsEKgcD86TycMV4Rw~M6Vvnv607Qkx-dBVlLmMlYliyWuPnoQmgTXqdGCVVK57OaZDy8m67whiEhsysCa4~YSCaje~FGOlrX20WWVK9D5mP4oR1Fn-8LQ~vZff6FH4EK022HRbBlJZyg28TztzoeeGPI-g22w2c8F-vaV2zmsbXmxnXhg__",
      title: "The way back",
      releaseDate: "1994-09-23",
      summary:
        "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high. A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high.",
    },
    {
      id: 2,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/d1ed/f372/ad16f84b4351c548ad40efff6081bd5e?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVWRNClnWgWhxQZPyPFj9KiFQZj82nGIex1hUyVlVocClnnur-JCWghK4VIiwtlX7sZc5KtHe82k0cJEPcQ5abbJsgbzY7pzC68ZNlJTRTMLy-gKcn12GtVuKH-NrtpKDHveIIV6K~es~dBu4IeB1sHcXomHQ9JW6GWREEsEKgcD86TycMV4Rw~M6Vvnv607Qkx-dBVlLmMlYliyWuPnoQmgTXqdGCVVK57OaZDy8m67whiEhsysCa4~YSCaje~FGOlrX20WWVK9D5mP4oR1Fn-8LQ~vZff6FH4EK022HRbBlJZyg28TztzoeeGPI-g22w2c8F-vaV2zmsbXmxnXhg__",
      title: "The way back",
      releaseDate: "1994-09-23",
      summary:
        "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high. A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high.",
    },
    {
      id: 3,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/d1ed/f372/ad16f84b4351c548ad40efff6081bd5e?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVWRNClnWgWhxQZPyPFj9KiFQZj82nGIex1hUyVlVocClnnur-JCWghK4VIiwtlX7sZc5KtHe82k0cJEPcQ5abbJsgbzY7pzC68ZNlJTRTMLy-gKcn12GtVuKH-NrtpKDHveIIV6K~es~dBu4IeB1sHcXomHQ9JW6GWREEsEKgcD86TycMV4Rw~M6Vvnv607Qkx-dBVlLmMlYliyWuPnoQmgTXqdGCVVK57OaZDy8m67whiEhsysCa4~YSCaje~FGOlrX20WWVK9D5mP4oR1Fn-8LQ~vZff6FH4EK022HRbBlJZyg28TztzoeeGPI-g22w2c8F-vaV2zmsbXmxnXhg__",
      title: "The way back",
      releaseDate: "1994-09-23",
      summary:
        "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high. A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high.",
    },
    {
      id: 4,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/d1ed/f372/ad16f84b4351c548ad40efff6081bd5e?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVWRNClnWgWhxQZPyPFj9KiFQZj82nGIex1hUyVlVocClnnur-JCWghK4VIiwtlX7sZc5KtHe82k0cJEPcQ5abbJsgbzY7pzC68ZNlJTRTMLy-gKcn12GtVuKH-NrtpKDHveIIV6K~es~dBu4IeB1sHcXomHQ9JW6GWREEsEKgcD86TycMV4Rw~M6Vvnv607Qkx-dBVlLmMlYliyWuPnoQmgTXqdGCVVK57OaZDy8m67whiEhsysCa4~YSCaje~FGOlrX20WWVK9D5mP4oR1Fn-8LQ~vZff6FH4EK022HRbBlJZyg28TztzoeeGPI-g22w2c8F-vaV2zmsbXmxnXhg__",
      title: "The way back",
      releaseDate: "1994-09-23",
      summary:
        "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high. A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high.",
    },
    {
      id: 5,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/d1ed/f372/ad16f84b4351c548ad40efff6081bd5e?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVWRNClnWgWhxQZPyPFj9KiFQZj82nGIex1hUyVlVocClnnur-JCWghK4VIiwtlX7sZc5KtHe82k0cJEPcQ5abbJsgbzY7pzC68ZNlJTRTMLy-gKcn12GtVuKH-NrtpKDHveIIV6K~es~dBu4IeB1sHcXomHQ9JW6GWREEsEKgcD86TycMV4Rw~M6Vvnv607Qkx-dBVlLmMlYliyWuPnoQmgTXqdGCVVK57OaZDy8m67whiEhsysCa4~YSCaje~FGOlrX20WWVK9D5mP4oR1Fn-8LQ~vZff6FH4EK022HRbBlJZyg28TztzoeeGPI-g22w2c8F-vaV2zmsbXmxnXhg__",
      title: "The way back",
      releaseDate: "1994-09-23",
      summary:
        "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high. A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high.",
    },
    {
      id: 6,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/d1ed/f372/ad16f84b4351c548ad40efff6081bd5e?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVWRNClnWgWhxQZPyPFj9KiFQZj82nGIex1hUyVlVocClnnur-JCWghK4VIiwtlX7sZc5KtHe82k0cJEPcQ5abbJsgbzY7pzC68ZNlJTRTMLy-gKcn12GtVuKH-NrtpKDHveIIV6K~es~dBu4IeB1sHcXomHQ9JW6GWREEsEKgcD86TycMV4Rw~M6Vvnv607Qkx-dBVlLmMlYliyWuPnoQmgTXqdGCVVK57OaZDy8m67whiEhsysCa4~YSCaje~FGOlrX20WWVK9D5mP4oR1Fn-8LQ~vZff6FH4EK022HRbBlJZyg28TztzoeeGPI-g22w2c8F-vaV2zmsbXmxnXhg__",
      title: "The way back",
      releaseDate: "1994-09-23",
      summary:
        "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high. A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high.",
    },
  ];

  return (
    <div className="wrapper">
      <SearchPanel />
      <MoviesList movies={mockData} />
    </div>
  );
}
export default App;
