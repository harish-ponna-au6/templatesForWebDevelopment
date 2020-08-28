module.exports =
	function registerValidation(req, res, next) {
		const { email, password, mobile } = req.body
		let regex = /^([a-zA-Z0-9_\.\-]{3,})+\@([a-zA-Z0-9\-]{3,})+\.(com|org|net|int|edu|gov)+$/g
		if (!regex.test(email)) return res.json({ error: 'enter valid email' })

		regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_])[a-zA-Z0-9\W_]{6,16}$/g
		if (!regex.test(password)) return res.json({ error: 'enter valid password(lenght should be min 3 chars and max 16, must contain one digit, one alpha lowercase and one alpha uppercase, one special symbol)' })

		regex = /^[0-9]{10}$/g
		if (!regex.test(mobile)) return res.json({ error: 'enter valid mobile number' })

		next()

	}
