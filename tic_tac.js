var turn, fail, stack_pointer, cur_pointer, decide ;
function get_board_cords( check_id )
{
	return [ (Math.floor(check_id/3)) , (check_id%3) ];
}

function availability( index )
{
	var x = index[0];
	var y = index[1];
	if(game[x][y] == 0)
		return 1;
	return 0;
}

function win_check( ele , index )
{
	var i, j, flag; 
		flag=0;
		for(i=0; i<3; i++)
		{
			if(game[i][i] != ele)
			{
				flag = 1;
				break;
			}
		}
		if(flag == 0)	return 1;

		flag=0;
		for(i=0,j=2; i<3; i++,j--)
		{
			if(game[i][j] != ele)
			{
				flag = 1;
				break;
			}
		}
		if(flag == 0)	return 1;
	
		flag=0;
		for(i=0; i<3; i++)
		{
			if(game[ index[0] ][ i ] != ele)
			{
				flag = 1;
				break;
			}
		}
		if(flag == 0)	return 1;

		flag=0;
		for(i=0; i<3; i++)
		{
			if(game[ i ][ index[1] ] != ele)
			{
				flag = 1;
				break;
			}
		}
		if(flag == 0)	return 1;
		else	return 0;
	
}

function fill_stack(ele, check_id) 
{
	stack_array[stack_pointer] = ele;
	stack_index[stack_pointer] = check_id;
	stack_pointer += 1;
}

function check(e)
{
	if(decide == 0)
	{
		var check_id = e.target.id;
		var index = get_board_cords(check_id);
		var state = availability(index);
		var data = document.getElementById(check_id);
		if(state)
		{
			fail += 1;
			if(turn == 0)
			{
				data.innerHTML = "X";
				game[ index[0] ][ index[1] ] = "X";
				turn = 1;
				var exchange = document.getElementsByTagName("h3")[0];
				exchange.innerHTML = "O's  TURN";

				cur_pointer += 1;
				fill_stack(game[ index[0] ][ index[1] ] , check_id);
			}
			else
			{
				data.innerHTML = "O";
				game[ index[0] ][ index[1] ] = "O";
				turn = 0;
				var exchange = document.getElementsByTagName("h3")[0];
				exchange.innerHTML = "X's  TURN";

				cur_pointer += 1;
				fill_stack(game[ index[0] ][ index[1] ] , check_id);
			}
			var win = win_check(game[ index[0] ][ index[1] ] , index);
			if(win == 1)
			{
				var cong = document.getElementsByTagName("h2")[0];
				cong.innerHTML = "Congrats '" + game[ index[0] ][ index[1] ] + "', You've Won :)";
				setTimeout(location.reload.bind(location), 5000);
				decide = 1;
			}
			else if(fail == 9)
			{
				var cong = document.getElementsByTagName("h2")[0];
				cong.innerHTML = "DRAW GAME..! ";
				setTimeout(location.reload.bind(location), 6000);
				decide = 1;
			}
		}
	}
}

function prev(e)
{
	if(decide ==0 && stack_pointer > 0)
	{
		stack_pointer -= 1;
		var data = document.getElementById(stack_index[stack_pointer]);
		data.innerHTML = " ";
	}
}

function next(e)
{
	if(decide ==0 && stack_pointer < cur_pointer)
	{
		var data = document.getElementById(stack_index[stack_pointer]);
		data.innerHTML = stack_array[stack_pointer];
		stack_pointer += 1;
	}
}

function myFunction()
{
	var arr=document.getElementsByTagName("td");
	for(var i=0;i<arr.length;i++)
	{
		arr[i].addEventListener("click", check);
		arr[i].setAttribute("id",String(i));
	}
	var but1 = document.getElementById("b1");
	var but2 = document.getElementById("b2");
	but1.addEventListener("click",prev);
	but2.addEventListener("click",next);
	game = [[0,0,0],[0,0,0],[0,0,0]];
	stack_array = [0,0,0,0,0,0,0,0,0];
	stack_index = [0,0,0,0,0,0,0,0,0];
	stack_pointer = 0;
	cur_pointer = 0;
	turn = 0;
	fail=0;
	decide = 0;
}

myFunction();