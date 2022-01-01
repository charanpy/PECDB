<h1>Coding Convention</h1>
<br />
<h3>Variable name - pascalCase</h3>
<p>Ex: getUser</p>
<br />
<h3>Controller</h3>
<code>
exports.getUser = catchAsync((req,res,next) => {
  // logic
})
</code>
<p>No need to use try catch,catchAsync catches all exceptions</p>
