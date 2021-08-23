import { create } from '../../lib/components/creator';
import recipeBarMobileComponent from './RecipeBarMobile';
import recipeBarDesktopComponent from './RecipeBarDesktop';
import './recipeBar.scss';

create('.recipeBarDesktopComponent', recipeBarDesktopComponent, 'recipeBarDesktopComponent');
create('.recipeBarMobileComponent', recipeBarMobileComponent, 'recipeBarMobileComponent');
