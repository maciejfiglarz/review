import Creator from '../../lib/components/creator';
import './RecipeSteps.scss';

Creator.createAsync('.recipeStepsComponent', async () => await import('./RecipeSteps'));
