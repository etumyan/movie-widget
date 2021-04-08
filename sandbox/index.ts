import { MoviesWidget, PeopleWidget } from '../dist';

const widgetOptions = {
  apiKey: 'put-your-tmdb-api-key-here',
};

const moviesWidgetContainer = document.getElementById('movies-widget')!;
MoviesWidget(moviesWidgetContainer, { ...widgetOptions });

const peopleWidgetContainer = document.getElementById('people-widget')!;
PeopleWidget(peopleWidgetContainer, { ...widgetOptions });
