#!/usr/bin/env python3
"""This module provides a function that returns element lengths."""

from typing import Iterable, Sequence, List, Tuple

def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Return a list of tuples containing each element and its length.

    Args:
        lst (Iterable[Sequence]): An iterable of sequence objects.

    Returns:
        List[Tuple[Sequence, int]]: List of tuples with sequence and length.
    """
    return [(i, len(i)) for i in lst]
