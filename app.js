const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose-schema-jsonschema')();

const app = express()
const PORT = 7654
const { Schema } = mongoose;

app.use(cors())
app.use(express.json())

app.use(express.static('public'))
app.post('/api/convert', (req, res) => {
	try {
		mongoose_schema = req.body.mongoose_schema
		if (!mongoose_schema) {
			return res.status(400).send('No mongoose schema provided')
		}
		mongoose_schema = JSON.parse(mongoose_schema)
		for (const [key, value] of Object.entries(mongoose_schema)) {
			if (value.type === 'mongoose.Schema.Types.ObjectId') {
				value.type = 'ObjectId'
			}
		}
		const s = new Schema(mongoose_schema, { timestamps: true })
		res.send(s.jsonSchema())
	} catch (error) {
		res.status(400).send(error.message)
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}/public`)
})