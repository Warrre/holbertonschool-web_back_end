#!/usr/bin/env python3
"""This module provides a function that returns a tuple with a string and the square of a number."""

from typing import Union, Tuple

def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Create a tuple with a string and the square of an int or float as a float.

    Args:
        k (str): The string to include in the tuple.
        v (Union[int, float]): The number to square.

    Returns:
        Tuple[str, float]: A tuple containing the string and the squared value as a float.
    """
    return (k, float(v ** 2))
