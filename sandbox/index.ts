import { MoviesWidget, PeopleWidget } from '../dist';

const moviesWidgetContainer = document.getElementById('movies-widget')!;
MoviesWidget(moviesWidgetContainer);

const peopleWidgetContainer = document.getElementById('people-widget')!;
PeopleWidget(peopleWidgetContainer);
