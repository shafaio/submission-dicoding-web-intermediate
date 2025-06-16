import HomePage from "../pages/home/home-page";
import StoriesPage from "../pages/stories/stories-page";
import StoryDetailPage from "../pages/stories/story-detail-page";
import LoginPage from "../pages/login/login-page";
import AddStoryPage from "../pages/stories/add-story-page";

const routes = {
  "/": new HomePage(),
  "/login": new LoginPage(),
  "/stories": new StoriesPage(),
  "/stories/:id": new StoryDetailPage(),
  "/add-story": new AddStoryPage(),
};

export default routes;
