export default class PojScope {
	constructor (pojScope) {
		if (!Array.isArray(pojScope)) {
			pojScope = [ String(pojScope) ]
		}

		this.current = pojScope.map((scope) => {
			return Array.isArray(scope)
				? scope
				: String(scope).split('.')
		})

		this.level = 0
		this.history = {}
		this.plsGoUp = this.plsGoUp.bind(this)
		this.canGoDown = this.canGoDown.bind(this)
	}
	plsGoUp () {
		this.current = this.history[--this.level]
	}
	canGoDown (key) {
		const level = this.level
		const scope = this.current.filter((s) => {
			s = s[level]
			return (s == key || s === '*')
		})
		if (scope.length) {
			this.history[this.level] = this.current
			this.current = scope
			this.level++
			return true
		}
		else {
			return false
		}
	}
}
