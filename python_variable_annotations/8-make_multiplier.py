#!/usr/bin/env python3
"""This module provides a function that returns a multiplier function."""

from typing import Callable

def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    Create a function that multiplies a float by a given multiplier.

    Args:
        multiplier (float): The multiplier to use.

    Returns:
        Callable[[float], float]: A function that multiplies its input by the multiplier.
    """
    def multiply(n: float) -> float:
        """
        Multiply a float by the multiplier.

        Args:
            n (float): The number to multiply.

        Returns:
            float: The result of the multiplication.
        """
        return n * multiplier
    return multiply
