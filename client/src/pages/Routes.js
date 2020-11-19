import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './LinksPage'
import { CreatePage } from './CreatePage'
import { DetailPage } from './DetailPage'
import { AutorisationPage } from './AutorisationPage'


export const useRoutes = isAutentificated => {//checking if user loged-in and he has his own token...
	if (isAutentificated) {// <Redirect> in case if we did't get to some page (or we have some unexisted page)
		return (
			<Switch>
				<Route path="/links" exact>
					<LinksPage />
				</Route>
				<Route path="/create" exact>
					<CreatePage />
				</Route>
				<Route path="/detail/:id">
					<DetailPage />
				</Route>
				<Redirect to="/create" />
			</Switch>
		)
	}
	return (//for those who not yet registred
		<Switch>
			<Route path="/" exact>
				<AutorisationPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
} 