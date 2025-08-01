#!/usr/bin/env python3
"""This module provides a function to sum a list containing integers and floats."""

from typing import List, Union

def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """
    Calculate the sum of a list containing integers and floats.

    Args:
        mxd_lst (List[Union[int, float]]): The list of numbers to sum.

    Returns:
        float: The sum of all the numbers in the list as a float.
    """
    return sum(mxd_lst)
