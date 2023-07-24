
const path=require('path')
const fs=require('fs')
const fs2=require('fs').promises

let client='/client'

let directory=['/contact','/about','/blog']
let files=['index.html','style.css','style.scss']

const createClient=async ()=>{
	await fs2.mkdir(path.join(__dirname,client), {}, err =>{
		if (err) {
			return console.log(err)
		};
		console.log('folder created client')

	})
	for (let i=0;i<files.length;i++){
		fs.writeFile(path.join(__dirname,client,files[i]), '', err=>{
			if (err) {
				console.log(err)
			}
			console.log('file created'&&files[i])
		}
		)
	}
}

const check=async(directory,file)=>{
	let thisData = await fs2.readFile(path.join(__dirname,directory,file),'utf8', (err,data) =>{
		if (err) {
			return console.log(err)
		}
		return Buffer.from(data)	
	}
	)
	return thisData

}

const update=async(directory)=>{
	for (let i=0;i<files.length;i++){
		let moveOn= await check(directory,files[i])
		if (moveOn!=''){
			console.log(moveOn)
		}
		else {
			if (files[i]=='index.html') {
				fs.appendFile(path.join(__dirname,directory,files[i]),
					`<h1>'${path.basename(__dirname)}<h1> 
					<link rel="stylesheet" href="${path.join(__dirname,files[1])}">`,
					err =>{
						if (err) {
							return console.log(err)
						}

					}
					)
			}
			else{

				let color =[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
				fs.appendFile(path.join(__dirname,directory,files[i]),
					`body{
						background-color:rgba(${color[0]},${color[1]},${color[2]})
					}`, err =>{
						if (err) {
							return console.log(err)
						}

					}
					)	
			}
		}
	}	
}

const createDirectory= async ()=>{
	for (let j=0;j<directory.length;j++){
		await fs2.mkdir(path.join(__dirname,client, directory[j]), {}, err =>{
			if (err) {
				return console.log(err)
			};
			console.log('folder created'&&directory[j])
		}
		)
		for (let i=0;i<files.length;i++){
			fs2.writeFile(path.join(__dirname,client,directory[j],files[i]), '', err=>{
				if (err) {
					return console.log(err)
				}
				console.log('file created'&&files[i])
			}
			)
		}

	}
}

/*
createClient()*/
/*update(client)*/

/*createDirectory()*/
/*for (let i=0;i<directory.length;i++){
	console.log(i)
	update(client+directory[i])}*/

const creation=async ()=>{
	await createClient()
	await createDirectory()
	update(client)
	for (let i=0;i<directory.length;i++){
	console.log(i)
	await update(client+directory[i])}
}
creation()
